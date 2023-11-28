import { connect } from "@/dbConfig/dbCongig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log(reqBody)

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);
        const user = await User.findOneAndUpdate({ forgotPasswordToken: token }, { password: hashedPassword }, { new: true })
        // user.save();
        return NextResponse.json({
            message: "Password Has Been Changed..",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ message: "Updation failed", status: 400 })
    }
}