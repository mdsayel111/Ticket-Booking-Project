import { userCollection } from "@/BackendFiles/Collections"
import { serverError, unathorizeError } from "@/BackendFiles/OnError"
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils"
import { verifyHost } from "@/BackendFiles/Utils/auth-utils"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { searchParams } = new URL(req.url)
            const email = searchParams.get("email")
            const updateDoc = {
                $set: {
                    status: "pending",
                    reqRole: "host"
                }
            }
            await connectDB()
            const result = await userCollection.updateOne({ email: email }, updateDoc, { runValidators: true })
            console.log(result)
            if (result.modifiedCount > 0) {
                return NextResponse.json({ message: "Request sent successful" })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}