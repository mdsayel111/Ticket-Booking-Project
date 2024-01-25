import { userCollection } from "@/ServerFiles/Collections"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
import { NextRequest, NextResponse } from "next/server"
import { addFeild } from "../../../../../../addFeild"
import { verifyAdmin } from "@/ServerFiles/Utils/auth-utils"

export const PATCH = async (req: NextRequest) => {
    try {
        const isAdmin = await verifyAdmin(req)
        if (isAdmin) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get("id")
            const updateDoc = {
                $set: {
                    role: "host",
                    reqRole: "none",
                    status: "none"
                }
            }
            await connectDB()
            const singleUser = await userCollection.findByIdAndUpdate(id, updateDoc, { runValidators: true })
            if (singleUser._id) {
                return NextResponse.json({ message: "Role update successful" })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}