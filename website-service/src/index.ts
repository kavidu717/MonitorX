import express, { Application, Request, Response } from "express"
import connectDB from "./config/db"



const app: Application = express()

app.use(express.json())

connectDB()

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "website service is healthy",
    })
})

const port = process.env.PORT || 5002

app.listen(port, () => {
    console.log(`website service is running on port ${port}`)
})