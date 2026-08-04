import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User, { IUserDocument } from '../models/User';
import { Request, Response, NextFunction } from 'express';


// JWT payload type
interface AuthPayload extends JwtPayload {
    id: string;
    role: string;
}


// Extend Express Request
export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
}


// Protect middleware
export const protect = asyncHandler(
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {

        let token: string | undefined;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {

            try {

                // Get token from:
                // Authorization: Bearer <token>

                token = req.headers.authorization.split(' ')[1];

                if (!token) {
                    res.status(401);
                    throw new Error('Not authorized, no token');
                }


                // Verify JWT token
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
                ) as AuthPayload;


                // Find user from decoded ID
                const user = await User.findById(decoded.id)
                    .select('-password');


                // User doesn't exist
                if (!user) {
                    res.status(401);
                    throw new Error(
                        'Not authorized, user not found'
                    );
                }


                // Check if user is blocked
                if (user.isBlocked) {
                    res.status(403);
                    throw new Error(
                        'Your account has been suspended. Please contact support.'
                    );
                }


                // Attach user to request
                req.user = user;


                // Continue to next middleware/controller
                next();

            } catch (error) {

                res.status(401);
                throw new Error('Not authorized');

            }

        } else {

            res.status(401);
            throw new Error(
                'Not authorized, no token provided'
            );

        }
    }
);


// Admin only middleware
export const adminOnly = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {

    if (req.user && req.user.role === 'admin') {

        next();

    } else {

        res.status(403);

        throw new Error(
            'Access denied. Administrator privileges required.'
        );
    }
};