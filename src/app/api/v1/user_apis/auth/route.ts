import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections";
import { verifyToken } from "@/CLient-And-Server-Shared-Files/Utils/auth-utils";
import { serverError, unathorizeError } from "@/ServerFiles/OnError";
import { matchPass } from "@/ServerFiles/Utils/Hash";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";
var jwt = require('jsonwebtoken');


// token api
export const POST = async (req: NextRequest) => {
    try {
        const userInfo = await req.json()
        await connectDB()

        // check valid user
        const userFromDB = await userCollection.findOne({ email: userInfo.email })

        const isPassMatch = matchPass(userInfo.password, userFromDB.password)

        if (userFromDB && isPassMatch) {
            const token = jwt.sign({
                email: userInfo.email,
            }, process.env.NEXT_PUBLIC_SECRET, { expiresIn: 60 * 60 });

            console.log(userFromDB)

            return new NextResponse(JSON.stringify({ message: "SignIn successfull", user: { name: userFromDB.name, email: userFromDB.email, role: userFromDB.role } }), {
                status: 200,
                headers: { "Set-Cookie": `token=${token}; sameSite=strict; Path=/; httpOnly=true; maxAge=60*60*24; ex` },
            });
        }
        return NextResponse.json({ message: "Email or password incorrect" })
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