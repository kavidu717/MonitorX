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
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; padding: 40px 20px; margin: 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center;">
                    
                    <h2 style="color: #1a1a1a; font-size: 24px; margin-top: 0; margin-bottom: 10px;">Email Verification</h2>
                    
                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        Thank you for choosing <strong>MonitorX</strong>. Please use the following One-Time Password (OTP) to complete your verification process:
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <span style="display: inline-block; background-color: #f0fcff; border: 2px dashed #00E5FF; border-radius: 8px; padding: 15px 30px; font-size: 42px; font-weight: bold; color: #008b99; letter-spacing: 8px;">
                            ${otp}
                        </span>
                    </div>
                    
                    <p style="color: #555555; font-size: 15px; margin-bottom: 30px;">
                        This code is valid for <strong>15 minutes</strong>.
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                    
                    <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 0;">
                        If you did not request this verification, please ignore this email or contact support if you have concerns about your account security.
                    </p>
                </div>
            </div>
            `,
        });
        console.log(`OTP email sent to ${to}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Could not send verification email');
    }
};