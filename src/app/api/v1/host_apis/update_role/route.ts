import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections"
import { verifyHost } from "@/CLient-And-Server-Shared-Files/Utils/auth-utils"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
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