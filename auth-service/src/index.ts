
import express, { Application, Request, Response } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes"
import cookieParser from "cookie-parser";






const app: Application = express();

app.use(express.json());
app.use(cookieParser())

connectDB();

app.use('/api/auth', userRoutes)

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "auth service is healthy",

    })
})

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`auth service is running on port ${port}`)
})





