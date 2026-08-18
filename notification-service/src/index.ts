import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import amqp from 'amqplib';
import PingLog from './models/PingLog';
import { sendAlertEmail } from './utils/email';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;
const activeAlerts = new Set<string>();

connectDB();


const startConsumer = async () => {
    try {

        const ampqServer = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
        const connection = await amqp.connect(ampqServer)
        const channel = await connection.createChannel()

        const queue = 'health_check'
        await channel.assertQueue(queue, { durable: true })

        console.log(`RabbitMQ Connected. Waiting for messages in "${queue}"...`);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());



                const actualLatency = data.responseTime;
                console.log(`[+] Received Data -> URL: ${data.url} | Status: ${data.status} | Latency: ${actualLatency}ms`);

                const newLog = new PingLog({
                    url: data.url,
                    status: data.status,
                    latency: actualLatency,

                })

                await newLog.save()
                console.log(`[x] Saved to Analytics DB!`);

                if (data.status === 'DOWN') {

                    if (!activeAlerts.has(data.url)) {

                        console.log(` New DOWN status detected for ${data.url}. Triggering email alert...`);

                        await sendAlertEmail(data.url, data.status, actualLatency);



                        activeAlerts.add(data.url);

                    } else {

                        console.log(`[!] Alert already sent for ${data.url}. Skipping email.`);

                    }

                } else if (data.status === 'UP') {

                    if (activeAlerts.has(data.url)) {

                        console.log(` ${data.url} is back UP! Clearing alert status.`);



                        activeAlerts.delete(data.url);

                    }

                }

                channel.ack(msg);

            }
        })



    } catch (error) {
        console.error('error conneting to rabbitmq', error);
    }



}

const startServer = async () => {
    await connectDB();
    await startConsumer();

    app.listen(PORT, () => {
        console.log(`Notification & Analytics Service is running on port ${PORT}`);
    });
};

startServer();
