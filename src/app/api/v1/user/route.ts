import { userCollection } from "@/BackendFiles/Collections";
import { serverError } from "@/BackendFiles/OnError";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";

// creat user API
export const POST = async (req: NextRequest) => {
    try {
        await connectDB()
        const newUser = await req.json()
        const user = new userCollection(newUser)
        await user.save()
        return NextResponse.json({ message: "user creat successful" });
    } catch (error) {
        return serverError(req)
    }
};