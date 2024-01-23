import { bookingCollection } from "@/BackendFiles/Collections";
import { serverError, unathorizeError } from "@/BackendFiles/OnError";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { verifyToken } from "@/BackendFiles/Utils/auth-utils";
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