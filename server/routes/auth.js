const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully ✅",
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful ✅",
            token,
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"TripToIndia" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "🔑 Password Reset - TripToIndia",
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <h1 style="color: #f49342; font-size: 28px;">TripToIndia</h1>
                    <h2 style="color: #1a202c;">Password Reset Request</h2>
                    <p style="color: #4a5568; font-size: 16px;">Hi ${user.name},</p>
                    <p style="color: #4a5568; font-size: 16px;">You requested a password reset. Click the button below to set a new password:</p>
                    <a href="${resetUrl}" style="display: inline-block; background-color: #f49342; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 24px 0;">Reset Password</a>
                    <p style="color: #718096; font-size: 14px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
                    <p style="color: #a0aec0; font-size: 12px;">© TripToIndia - Your Indian Adventure Awaits</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to your email ✅" });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Failed to send reset email", error: error.message });
    }
});

// ✅ RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password reset successful ✅" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;