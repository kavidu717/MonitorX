import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createWebsite } from "../controllers/websiteController";
import { Request, Response } from "express";


const router = express.Router()

console.log("websitesRoutes.ts loaded");

router.get("/test", (req: Request, res: Response) => {
    res.json({
        message: "Website routes are working"
    });
});

router.post("/", protect, createWebsite)




export default router;