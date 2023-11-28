import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbCongig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        console.log(reqBody)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid User" }, { status: 400 }
            )
        }
        sendEmail({ email, emailtype: "RESET", userId: user._id })
        return NextResponse.json({
            message: "Email send successfully!!",
            success: true,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

}