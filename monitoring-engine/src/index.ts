import dotenv from "dotenv";
import express from "express";


dotenv.config();



const app = express()
const PORT = process.env.PORT || 5003;





app.listen(PORT, () => {
    console.log(`Monitoring engine on port ${PORT}`)
})