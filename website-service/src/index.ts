import express, { Application, Request, Response } from "express"
import connectDB from "./config/db"
import websitesRoutes from "./routes/websitesRoutes"


const app: Application = express()

app.use(express.json())

connectDB()

app.get("/health", (req: Request, res: Response) => {
    res.json({
        message: "website service is healthy",
    })

})

app.get("/api-test", (req: Request, res: Response) => {
    res.json({
        message: "API test is working"
    });
});

console.log("Loading website routes...");
app.use('/api/websites', websitesRoutes)


const port = process.env.PORT || 5002

app.listen(port, () => {
    console.log(`website service is running on port ${port}`)
})