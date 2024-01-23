import { userCollection } from "@/BackendFiles/Collections"
import { serverError, unathorizeError } from "@/BackendFiles/OnError"
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils"
import { verifyAdmin } from "@/BackendFiles/Utils/auth-utils"
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
            const multiUser = await userCollection.find()
            return NextResponse.json({ multiUser })
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}