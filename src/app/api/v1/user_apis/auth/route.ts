var jwt = require('jsonwebtoken');
import { userCollection } from "@/BackendFiles/Collections";
import { serverError, unathorizeError } from "@/BackendFiles/OnError";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { verifyToken } from "@/BackendFiles/Utils/auth-utils";
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
            headers: { "Set-Cookie": `token=${token}; sameSite=strict; Path=/; httpOnly=true; maxAge=60*60*24` },
        });
    } catch (error) {
        return serverError(req)
    }
};


// get role API
export const GET = async (req: NextRequest) => {
    try {
        const isVerify = await verifyToken(req)
        if (isVerify) {
            await connectDB()
            const { searchParams } = new URL(req.url)
            const email = searchParams.get("email")
            const { role } = await userCollection.findOne({ email: email });
            if (role) {
                return NextResponse.json({ role: role })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }

};