import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections";
import { serverError } from "@/ServerFiles/OnError";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";

// creat user API
export const POST = async (req: NextRequest) => {
    try {
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