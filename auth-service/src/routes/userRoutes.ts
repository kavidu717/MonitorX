import express from 'express';
import { forgotPassword, getAllUser, getProfile, loginUser, refreshToken, registerUser, resetPassword, updatePassword, verifyOtp } from '../controllers/userController';
import { adminOnly, protect } from '../middleware/authMiddleware';



const router = express.Router();

router.post('/register', registerUser)
router.post('/verify-otp', verifyOtp)

router.post('/login', loginUser)
router.post('/refresh', refreshToken)


router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.get('/me', protect, getProfile)
router.put('/update-password', protect, updatePassword)


router.get('/admin/users', protect, adminOnly, getAllUser)

export default router
