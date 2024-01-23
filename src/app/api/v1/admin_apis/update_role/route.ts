import { userCollection } from "@/BackendFiles/Collections"
import { serverError, unathorizeError } from "@/BackendFiles/OnError"
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils"
import { NextRequest, NextResponse } from "next/server"
import { addFeild } from "../../../../../../addFeild"
import { verifyAdmin } from "@/BackendFiles/Utils/auth-utils"

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