import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createWebsite, deleteWebsite, getWebsites, getWebsitesById } from "../controllers/websiteController";
import { Request, Response } from "express";


const router = express.Router()

console.log("websitesRoutes.ts loaded");

router.get("/test", (req: Request, res: Response) => {
    res.json({
        message: "Website routes are working"
    });
});

router.post("/", protect, createWebsite)
router.get("/", protect, getWebsites)
router.get("/:id", protect, getWebsitesById)
router.delete("/:id", protect, deleteWebsite)




export default router;