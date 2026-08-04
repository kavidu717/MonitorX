import express from 'express';
import { loginUser, refreshToken, registerUser, verifyOtp } from '../controllers/userController';



const router = express.Router();

router.post('/register', registerUser)
router.post('/verify-otp', verifyOtp)

router.post('/login', loginUser)
router.post('/refresh', refreshToken)


export default router
