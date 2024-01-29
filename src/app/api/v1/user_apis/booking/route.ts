import { bookingCollection } from "@/CLient-And-Server-Shared-Files/Collections";
import { serverError, unathorizeError } from "@/ServerFiles/OnError";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { verifyToken } from "@/ServerFiles/Utils/auth-utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const isVerify = await verifyToken(req)
        if (isVerify) {
            const bookingData = await req.json()
            const newBooking = await bookingCollection(bookingData)
            await connectDB()
            const result = await newBooking.save()
            if (result._id) {
                return NextResponse.json({ message: "Booking successful" })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error: any) {
        console.log(error.message)
        return serverError(req)
    }
};