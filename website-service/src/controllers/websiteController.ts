import asyncHandler from "express-async-handler";
import Website from "../models/websites";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";

export const createWebsite = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {

        const { name, url, checkInterval, isActive, tags } = req.body;

        const userId = req.user?.id;

        if (!userId) {
            res.status(401);
            throw new Error("User not authenticated");
        }

        if (!name || !url) {
            res.status(400);
            throw new Error("Name and url are required");
        }

        const website = await Website.create({
            userId,
            name,
            url,
            checkInterval,
            isActive,
            tags: tags || []
        });

        res.status(201).json(website);
    }
);


export const getWebsites = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {

        if (!req.user) {
            res.status(401);
            throw new Error("Not authorized");
        }

        const websites = await Website.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(websites);
    }
);