const jwt = require('jsonwebtoken');
import { NextRequest } from "next/server";
import { userCollection } from "../Collections";

export const verifyToken = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    const token = req.cookies.get("token")?.value

    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_SECRET)
            if (decoded.email === email) {
                return email
            }
        } catch (error) {
            return false
        }
    }
    return false
}

export const verifyHost = async (req: NextRequest) => {
    try {
        const email = await verifyToken(req)
        const { role } = await userCollection.findOne({ email: email })
        if (role === "host") {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export const verifyAdmin = async (req: NextRequest) => {
    const email = await verifyToken(req)
    const { role } = await userCollection.findOne({ email: email })
    if (role === "admin") {
        return true
    }
    return false
}