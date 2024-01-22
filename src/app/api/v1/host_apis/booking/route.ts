import { bookingCollection } from "@/BackendFiles/Collections"
import { serverError } from "@/BackendFiles/OnError"
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url)
        const status = searchParams.get("status")
        await connectDB()
        const multiData = await bookingCollection.find({ status })
        return NextResponse.json({ multiData })
    } catch (error) {
        return serverError(req)
    }
}

export const PATCH = async (req: NextRequest) => {
    try {
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
    } catch (error) {
        return serverError(req)
    }
}