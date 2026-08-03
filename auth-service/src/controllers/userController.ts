import jwt from "jsonwebtoken";



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

