import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export interface AuthenticatedRequest extends Request {
    user?: { id: string; role: string };
}



export const protect = asyncHandler(
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as unknown as {
                id: string;
                role: string;
            };

            req.user = {
                id: decoded.id,
                role: decoded.role,
            };

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
);