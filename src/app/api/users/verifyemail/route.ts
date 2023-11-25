import { connect } from "@/dbConfig/dbCongig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({
                message: "Invalid token",
                success: false
            })
        }
        console.log(`This is the user ID ----------->> ${user._id}`)
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: "Email verified..!!",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}
