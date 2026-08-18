import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {

        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS

    }

});



export const sendAlertEmail = async (websiteUrl: string, status: string, latency: number) => {

    try {

        const mailOptions = {

            from: `"MonitorX Alerts" <${process.env.SMTP_USER}>`,

            to: process.env.SMTP_USER,

            subject: ` URGENT: MonitorX Alert - ${websiteUrl} is ${status}!`,

            html: `

                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; padding: 40px 20px; margin: 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                        <div style="background-color: #ef4444; padding: 25px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">MonitorX System Alert</h1> 
                        </div>


                        <div style="padding: 30px; color: #e2e8f0;">

                            <p style="font-size: 16px; margin-top: 0;">Your monitored infrastructure requires immediate attention. A website has been detected as <strong style="color: #ef4444;">DOWN</strong>.</p>
                            <div style="background-color: #0f172a; border-left: 4px solid #ef4444; padding: 20px; margin: 25px 0; border-radius: 4px;">

                                <table style="width: 100%; border-collapse: collapse;">

                                    <tr>

                                        <td style="padding: 8px 0; color: #94a3b8; width: 100px;">Target URL:</td>
                                        <td style="padding: 8px 0;"><a href="${websiteUrl}" style="color: #60a5fa; text-decoration: none; word-break: break-all;">${websiteUrl}</a></td>

                                    </tr>

                                    <tr>

                                        <td style="padding: 8px 0; color: #94a3b8;">Status:</td>
                                        <td style="padding: 8px 0;"><span style="background-color: #ef4444; color: white; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: bold; letter-spacing: 1px;">${status}</span></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #94a3b8;">Latency:</td>
                                        <td style="padding: 8px 0; color: #f8fafc; font-family: monospace; font-size: 15px;">${latency ? latency + ' ms' : 'N/A'}</td>

                                    </tr>

                                    <tr>

                                        <td style="padding: 8px 0; color: #94a3b8;">Timestamp:</td>
                                        <td style="padding: 8px 0; color: #f8fafc;">${new Date().toLocaleString()}</td>

                                    </tr>
                                </table>
                            </div>



                            <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">
                                Please check your server, application logs, or hosting provider immediately to resolve this issue and restore service.
                            </p>
                        </div>

                        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
                            <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} MonitorX Infrastructure. All rights reserved.</p>

                        </div>
                    </div>
                </div>

            `

        };



        await transporter.sendMail(mailOptions);

        console.log(` Alert email sent successfully for ${websiteUrl}`);

    } catch (error) {

        console.error("[!] Error sending alert email:", error);

    }

};