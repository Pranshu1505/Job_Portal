import express from "express";
import { login, logout, register, updateProfile, toggleSaveJob, getSavedJobs, googleAuth, forgotPassword, resetPassword, verifyOtp, resendOtp, switchRole } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload, profileUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, profileUpload, updateProfile);
router.route("/savedjobs/:id").post(isAuthenticated, toggleSaveJob);
router.route("/savedjobs").get(isAuthenticated, getSavedJobs);
router.route("/google-auth").post(googleAuth);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);
router.route("/switch-role").post(isAuthenticated, switchRole);

export default router;