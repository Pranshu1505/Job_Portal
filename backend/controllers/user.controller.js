import {User} from  "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";



const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async(req, res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"Something is mising",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            },
            isVerified: false,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        const html = `
            <div style="font-family: sans-serif; max-width: 500px; margin: auto;">
                <h2>Verify your JobPortal account</h2>
                <p>Hi ${fullname},</p>
                <p>Your OTP for email verification is:</p>
                <h1 style="letter-spacing: 5px; color: #6A38C2;">${otp}</h1>
                <p>This code is valid for 10 minutes.</p>
            </div>
        `;

        await sendEmail({
            to: email,
            subject: "Verify your JobPortal account",
            html
        });

        return res.status(201).json({
            message:"Account created. Please verify your email with the OTP sent.",
            success:true,
            email: newUser.email
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message:"Something is mising",
                success:false
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                message:"Incorrect password",
                success:false,
            })
        }

        if(!user.isVerified){
            return res.status(403).json({
                message:"Please verify your email before logging in",
                success:false,
                needsVerification:true,
                email:user.email
            })
        }
        
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production" ? true : false})
            .json({
                message:`Welcome back ${user.fullname}`,
                user,
                tokenExpiresAt: Date.now() + 1*24*60*60*1000,
                success:true,
        })
    } catch (error) {
        console.log(error);
    }
};

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token", "",{maxAge:0, sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production" ? true : false})
            .json({
                message:"Logged out Successfully",
                success:true,
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfile = async(req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;

        const profilePhotoFile = req.files?.profilePhoto?.[0];
        const resumeFile = req.files?.resume?.[0];

        let skillsArray;
        if(skills){
           skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                message:"User not found.",
                success:false,
            })
        };

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        if(profilePhotoFile){
            const fileUri = getDataUri(profilePhotoFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url;
        }

        if(resumeFile){
            const fileUri = getDataUri(resumeFile);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = resumeFile.originalname;
        }

        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        const alreadySaved = user.savedJobs.includes(jobId);

        if(alreadySaved){
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }

        await user.save();

        return res.status(200).json({
            message: alreadySaved ? "Job removed from saved list" : "Job saved successfully",
            saved: !alreadySaved,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path:'savedJobs',
            populate:{
                path:'company'
            }
        });

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const googleAuth = async (req, res) => {
    try {
        const { credential, role } = req.body;

        if(!credential){
            return res.status(400).json({
                message:"Google credential is required",
                success:false
            })
        }

        // Verify the Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if(user){
            // Existing user - just log them in
            // Optional: check role matches (skip strict check for smoother UX)
        } else {
            // New user - role is required for first-time signup
            if(!role){
                return res.status(200).json({
                    message:"New user, role required",
                    success:false,
                    needsRole:true,
                    tempData:{ email, name, picture }
                })
            }

            user = await User.create({
                fullname: name,
                email,
                phoneNumber: "0000000000", // placeholder, since schema requires it
                password: await bcrypt.hash(email + Date.now(), 10), // random unusable password
                role,
                profile:{
                    profilePhoto: picture || ""
                },
                isVerified: true
            });
        }

        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userResponse = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message:`Welcome ${user.fullname}`,
            user:userResponse,
            tokenExpiresAt: Date.now() + 1*24*60*60*1000,
            success:true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Google authentication failed",
            success:false
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            return res.status(400).json({
                message:"Email is required",
                success:false
            })
        }

        const user = await User.findOne({ email });
        if(!user){
            // Security: don't reveal whether email exists
            return res.status(200).json({
                message:"If this email is registered, a reset link has been sent",
                success:true
            })
        }

        // Generate a random token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const html = `
            <div style="font-family: sans-serif; max-width: 500px; margin: auto;">
                <h2>Reset your JobPortal password</h2>
                <p>Hi ${user.fullname},</p>
                <p>Click the button below to reset your password. This link is valid for 15 minutes.</p>
                <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background:#6A38C2; color:white; text-decoration:none; border-radius:5px; margin:10px 0;">Reset Password</a>
                <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
        `;

        const emailSent = await sendEmail({
            to: user.email,
            subject: "Reset your JobPortal password",
            html
        });

        if(!emailSent){
            return res.status(500).json({
                message:"Failed to send email, please try again later",
                success:false
            })
        }

        return res.status(200).json({
            message:"If this email is registered, a reset link has been sent",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if(!password){
            return res.status(400).json({
                message:"New password is required",
                success:false
            })
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if(!user){
            return res.status(400).json({
                message:"Reset link is invalid or has expired",
                success:false
            })
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({
            message:"Password reset successfully. Please login with your new password.",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if(!email || !otp){
            return res.status(400).json({
                message:"Email and OTP are required",
                success:false
            })
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(user.isVerified){
            return res.status(400).json({
                message:"Email is already verified",
                success:false
            })
        }

        if(user.otp !== otp || user.otpExpires < Date.now()){
            return res.status(400).json({
                message:"Invalid or expired OTP",
                success:false
            })
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({
            message:"Email verified successfully. You can now login.",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            return res.status(400).json({
                message:"Email is required",
                success:false
            })
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(user.isVerified){
            return res.status(400).json({
                message:"Email is already verified",
                success:false
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const html = `
            <div style="font-family: sans-serif; max-width: 500px; margin: auto;">
                <h2>Your new OTP</h2>
                <p>Hi ${user.fullname},</p>
                <h1 style="letter-spacing: 5px; color: #6A38C2;">${otp}</h1>
                <p>This code is valid for 10 minutes.</p>
            </div>
        `;

        await sendEmail({
            to: email,
            subject: "Your new JobPortal OTP",
            html
        });

        return res.status(200).json({
            message:"New OTP sent to your email",
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}


export const switchRole = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        const newRole = user.role === 'student' ? 'recruiter' : 'student';
        user.role = newRole;
        await user.save();

        const userResponse = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:`Your role has been switched to ${newRole}`,
            user: userResponse,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
    }
}