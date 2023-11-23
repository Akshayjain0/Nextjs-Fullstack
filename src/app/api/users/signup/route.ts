import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbCongig';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);

        const {username, email, password} = reqBody;

        // Check if user already exists
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User Successfully Created",
            success: true,
            status:200,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },
            {
                status: 400
            })
    }
}