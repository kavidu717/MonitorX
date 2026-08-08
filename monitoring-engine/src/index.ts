import dotenv from "dotenv";
import express from "express";
import { Request, Response } from 'express'

dotenv.config();



const app = express()
const PORT = process.env.PORT || 5003;


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'Monitoring Engine is active and scheduling pings!' });
})


app.listen(PORT, () => {
    console.log(`Monitoring engine on port ${PORT}`)
})