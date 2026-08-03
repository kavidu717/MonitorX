import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";
import { sendOtpEmail } from "../services/emailService";



// generate the random 6 digit otp
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// generate the access token
const generateAccessToken = (id: string, role: string): string => {
    return jwt.sign
        (
            { id, role }, process.env.JWT_SECRET as string, {
            expiresIn: '15m',
        }
        );
};

//generate Refresh token
const generateRefreshToken = (id: string): string => {
    return jwt.sign
        (
            { id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d", // 1 week
            }
        )
}

// user register function
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body

    // check the email is already exist 
    const userExits = await User.findOne({ email });
    if (userExits) {
        throw new Error("Email is already exist");
    }

    const otpCode = generateOtp();
    const otpExpires = new Date(Date.now() + 15 * 60000)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        otpCode,
        otpExpires,

    })

    if (user) {
        await sendOtpEmail(user.email, otpCode)

        res.status(201).json({
            message: "User registered successfully.Please verify your email",
            email: user.email,
        })


    } else {
        res.status(400).json({
            message: "invalid user data received",
        })
    }


})
