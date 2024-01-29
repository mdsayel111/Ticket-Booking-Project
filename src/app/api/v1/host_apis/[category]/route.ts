import { getCollection } from "@/CLient-And-Server-Shared-Files/Utils/Email"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
import { verifyHost } from "@/ServerFiles/Utils/auth-utils"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest, { params }: any) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { category } = params
            const data = await req.json()
            const dataObtainCollections = getCollection(params)
            await connectDB()
            const newData = new dataObtainCollections(data)
            const result = await newData.save()
            if (result._id) {
                return NextResponse.json({ message: `${category.slice(0, category.length - 1)} creat successful` })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error: any) {
        console.log(error.message)
        return serverError(req)
    }
}

export const PATCH = async (req: NextRequest, { params }: any) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { category } = params
            const { searchParams } = new URL(req.url)
            const id = searchParams.get("id")
            const data = await req.json()
            const updateDoc = {
                $set: {
                    ...data
                }
            }
            const dataObtainCollections = getCollection(params)
            await connectDB()
            const result = await dataObtainCollections.findOneAndUpdate({ _id: id }, updateDoc)
            if (result._id) {
                return NextResponse.json({ message: `${category.slice(0, category.length - 1)} update successful` })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
    try {
        const isHost = await verifyHost(req)
        if (isHost) {
            const { category } = params
            const { searchParams } = new URL(req.url)
            const id = searchParams.get("id")
            const dataObtainCollections = getCollection(params)
            await connectDB()
            const result = await dataObtainCollections.deleteOne({ _id: id })
            console.log(result)
            if (result.deletedCount > 0) {
                return NextResponse.json({ message: `${category.slice(0, category.length - 1)} update successful` })
            }
            return serverError(req)
        }
        return unathorizeError(req)
    } catch (error) {
        return serverError(req)
    }
}