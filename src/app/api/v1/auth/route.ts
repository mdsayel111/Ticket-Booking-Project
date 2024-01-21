var jwt = require('jsonwebtoken');
import { userCollection } from "@/BackendFiles/Collections";
import { serverError } from "@/BackendFiles/OnError";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "react-router-dom";


// token api
export const POST = async (req: NextRequest) => {
    try {
        const userInfo = await req.json()
        const token = jwt.sign({
            email: userInfo.email,
        }, process.env.NEXT_PUBLIC_SECRET, { expiresIn: 60 * 60 });

        return new NextResponse(JSON.stringify({ message: "token send successfull" }), {
            status: 200,
            headers: { "Set-Cookie": `token=${token}; sameSite=strict; httpOnly=true; maxAge=60*60*24` },
        });
    } catch (error) {
        return serverError(req)
    }
};


// get role API
export const GET = async (req: NextRequest) => {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const { role } = await userCollection.findById(id).exec();
        return NextResponse.json({ role: role })
    } catch (error) {
        return serverError(req)
    }

};