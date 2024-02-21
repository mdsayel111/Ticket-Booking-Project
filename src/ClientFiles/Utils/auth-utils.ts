// todo: convert all this function for server and client both

const jwt = require('jsonwebtoken');
import { userCollection } from "@/CLient-And-Server-Shared-Files/Collections";

export const verifyToken = async (values: { searchParams: { email: string }, token: string }) => {
    const { searchParams } = values
    const email = searchParams.email
    const { token } = values
    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_SECRET)
            console.log(email, decoded.email)
            if (decoded.email === email) {

                return email
            }
        } catch (error) {

            return false
        }
    }
    return false
}

export const verifyHost = async (values: { searchParams: { email: string }, token: string }) => {
    try {
        const email = await verifyToken(values)
        const { role } = await userCollection.findOne({ email: email })
        if (role === "host") {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export const verifyAdmin = async (values: { searchParams: { email: string }, token: string }) => {
    const email = await verifyToken(values)
    const { role } = await userCollection.findOne({ email: email }) || {}
    if (role === "admin") {
        return true
    }
    return false
}