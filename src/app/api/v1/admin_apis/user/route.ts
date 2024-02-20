import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections"
import { verifyAdmin } from "@/CLient-And-Server-Shared-Files/Utils/auth-utils"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const isAdmin = await verifyAdmin(req)
        if (isAdmin) {
            const { searchParams } = new URL(req.url)
            const status = searchParams.get("status")
            await connectDB()
            if (status) {
                const muliUser = await userCollection.find({ status })
                return NextResponse.json({ muliUser })
            }
            const multiUser = await userCollection.find({})
            return NextResponse.json({ multiUser })
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}