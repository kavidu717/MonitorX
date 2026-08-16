import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;


connectDB();

app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});

