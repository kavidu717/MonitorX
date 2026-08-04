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

// this is for the verify otp
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body

    // find the user by the email
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404)
        throw new Error('user not found')
    }

    if (user.otpCode !== otp) {
        res.status(400)
        throw new Error('invalid otp provide')
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
        res.status(400);
        throw new Error('Your OTP has expired. Please request a new one.');
    }

    user.otpCode = '';
    user.otpExpires
    await user.save();

    // generate the token

    const accessToken = generateAccessToken(user._id.toString(), user.role)
    const refreshToken = generateRefreshToken(user._id.toString())

    res.cookie('jwt_refresh', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days


    })

    res.status(200).json({
        message: "email verified success",
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        accessToken,
    })


})

// login the user 
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    // find the user by email
    const user = await User.findOne({ email })

    if (user && (await user.comparePassword(password))) {

        const accessToken = generateAccessToken(user._id.toString(), user.role)
        const refreshToken = generateRefreshToken(user._id.toString())


        res.cookie('jwt_refresh', refreshToken, {

            httpOnly: true, // Not accessible via document.cookie
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',       // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        });

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            accessToken,
        });



    } else {
        res.status(401)
        throw new Error('invalid username or password')
    }



})

