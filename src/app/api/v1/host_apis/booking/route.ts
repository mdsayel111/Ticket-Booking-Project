import { bookingCollection } from "@/ServerFiles/Collections"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
import { verifyHost } from "@/ServerFiles/Utils/auth-utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { searchParams } = new URL(req.url)
            const status = searchParams.get("status")
            await connectDB()
            const multiData = await bookingCollection.find({ status })
            return NextResponse.json({ multiData })
        }
        return unathorizeError(req)
    } catch (error) {
        console.log(error)
        return serverError(req)
    }
}

export const PATCH = async (req: NextRequest) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get("id")
            const updateDoc = {
                $set: {
                    status: "complete"
                }
            }
            await connectDB()
            const result = await bookingCollection.findByIdAndUpdate(id, updateDoc, { runValidators: true })
            if (result._id) {
                return NextResponse.json({ message: "Booking updated successful" })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}