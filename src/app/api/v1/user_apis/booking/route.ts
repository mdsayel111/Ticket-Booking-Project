import { bookingCollection } from "@/CLient-And-Server-Shared-Files/Collections";
import { verifyToken } from "@/CLient-And-Server-Shared-Files/Utils/auth-utils";
import { serverError, unathorizeError } from "@/ServerFiles/OnError";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const isVerify = await verifyToken(req)
        if (isVerify) {
            const bookingData = await req.json()
            console.log(bookingData)
            const newBooking = await bookingCollection(bookingData, true)
            await connectDB()
            const result = await newBooking.save()
            if (result._id) {
                return NextResponse.json({ message: "Booking successful" })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error: any) {
        return serverError(req)
    }
};