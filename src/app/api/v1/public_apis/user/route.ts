import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections";
import { serverError } from "@/ServerFiles/OnError";
import { hashPass } from "@/ServerFiles/Utils/Hash";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";

// creat user API
export const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const userData = await req.json()
        console.log(userData)
        const { password } = userData
        const userHashPass = hashPass(password)
        const newUser = { ...userData, password: userHashPass }
        const user = new userCollection(newUser)
        const result = await user.save()
        if (result._id) {
            return NextResponse.json({ message: "user creat successful" });
        }
        return serverError(req)
    } catch (error: any) {
        return serverError(req)
    }
};

export const GET = async (req: NextRequest, params: { email: string }) => {
    try {
        console.log(params)
        await connectDB()
        const newUser = await req.json()
        const user = new userCollection(newUser)
        const result = await user.save()
        if (result._id) {
            return NextResponse.json({ message: "user creat successful" });
        }
        return serverError(req)
    } catch (error) {
        return serverError(req)
    }
};