import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});


// send the otp for the specifc address

export const sendOtpEmail = async (to: string, otp: string) => {
    try {
        await transporter.sendMail({
            from: `"MonitorX Security" <${process.env.SMTP_USER}>`,
            to,
            subject: 'Verify your email address - MonitorX',
            html: `
        <h2>Email Verification</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h1 style="color: #00E5FF; font-size: 40px; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 15 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
      `,
        });
        console.log(`OTP email sent to ${to}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Could not send verification email');
    }
};