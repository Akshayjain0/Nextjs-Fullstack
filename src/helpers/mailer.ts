import User from "@/models/userModel";
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailtype, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 360000
            })
        }
        else if (emailtype === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 360000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_ID,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOption = {
            from: "jainakki12@gmail.com",
            to: email,
            subject: emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailtype === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}"> here</a>to ${emailtype === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }
        //http://localhost:3000/verifyemail?token=fjkadf34jkfj here to Verify your email.

        const mailResponse = await transport.sendMail(mailOption)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
