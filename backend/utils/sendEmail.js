import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"JobPortal" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        return true;
    } catch (error) {
        console.log("Email send error:", error);
        return false;
    }
};