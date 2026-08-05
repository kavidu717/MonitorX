import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/monitorx_websites';
        await mongoose.connect(mongoURI);
        console.log('Mongo DB is connected for the website service')


    } catch (error: any) {
        console.log('Mongo DB is not connected for the website service')
        process

    }
}
export default connectDB;