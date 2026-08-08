import dotenv from "dotenv";
import express from "express";
import { Request, Response } from 'express'
import mongoose from "mongoose";
import cron from 'node-cron'
import { pingWebsite } from "./utils/pinger";
import Website from "./models/Website";
import { connectRabbitMQ } from "./utils/rabbitmq";

dotenv.config();



const app = express()
const PORT = process.env.PORT || 5003;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    } catch (error: any) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

const startScheduler = () => {
    console.log(' Monitoring Cron Scheduler Started...');

    // This cron expression '* * * * *' means "run every minute"
    cron.schedule('* * * * *', async () => {
        const currentMinute = new Date().getMinutes();

        try {
            // Fetch all websites where isActive is true
            const activeWebsites = await Website.find({ isActive: true });

            // Filter to only include websites due for a check this minute
            const websitesToCheck = activeWebsites.filter((site) => {

                return currentMinute % site.checkInterval === 0;
            });

            if (websitesToCheck.length > 0) {
                console.log(`[Cron] Minute ${currentMinute}: Pinging ${websitesToCheck.length} websites...`);

                // Execute all pings concurrently rather than waiting for them one by one
                await Promise.all(websitesToCheck.map(site => pingWebsite(site)));
            }

        } catch (error) {
            console.error('[Cron] Error during scheduled execution:', error);
        }
    });
};


const startServer = async () => {
    await connectDB();
    await connectRabbitMQ()

    startScheduler();

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json({ status: 'Monitoring Engine is active and scheduling pings!' });
    })

    app.listen(PORT, () => {
        console.log(`Monitoring engine on port ${PORT}`)
    })

}

startServer();





