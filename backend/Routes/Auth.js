const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validator');

// Authentication Routes
router.post('/register', 
    authController.registerValidation, 
    validate, 
    authController.register
);

router.post('/login', 
    authController.loginValidation, 
    validate, 
    authController.login
);

router.get('/me', 
    protect, 
    authController.getMe
);

router.put('/profile', 
    protect, 
    authController.updateProfile
);

router.put('/change-password', 
    protect, 
    authController.changePassword
);

// OTP Authentication Routes
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);

// Token Management Routes
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', protect, authController.logout);

// Legacy routes for backward compatibility with existing frontend
router.post('/createuser', authController.registerValidation, validate, authController.register);
router.post('/getuser', protect, authController.getMe);

// Food data endpoint (temporary - will move to menu routes)
router.post('/foodData', async (req, res) => {
    try {
        res.send([global.foodData, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
});

module.exports = router;