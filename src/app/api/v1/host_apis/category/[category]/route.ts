import { getCollection } from "@/CLient-And-Server-Shared-Files/Utils/Email"
import { serverError, unathorizeError } from "@/ServerFiles/OnError"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
import { verifyHost } from "@/ServerFiles/Utils/auth-utils"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest, { params }: any) => {
    try {
        await connectDB()

        const isHost = await verifyHost(req)
        if (isHost) {
            const { category } = params
            const data = await req.json()
            const dataObtainCollections = getCollection(params)
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

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        console.log(params)
        const { searchParams }: any = new URL(req.url)
        const email = searchParams.get("email")
        const id = searchParams.get("id")
        const dataObtainCollections = getCollection(params)


        if (await verifyHost(req)) {
            // cheked, should return single data or multiple data
            await connectDB()
            if (id) {
                const singleData = await dataObtainCollections.findById({ hostEmail: email, id })
                return NextResponse.json({ singleData })
            } else {
                // creat filter obj for find multiple data and send multiple data
                let filter: { date?: object, hostEmail?: String } = {};
                const date: any = searchParams.get("date")
                const email: any = searchParams.get("email")
                // add filter property
                if (searchParams.size > 0) {
                    if (date !== "all") {
                        // make start date and end date for filter
                        const startDate = new Date(date)
                        const endDate = new Date(startDate);
                        endDate.setDate(startDate.getDate() + 2);

                        filter.date = {
                            $gte: startDate,
                            $lt: endDate
                        }
                    }
                    if (email) {
                        filter.hostEmail = email
                    }
                    const multiData = await dataObtainCollections.find(filter)
                    return NextResponse.json({ multiData: multiData })
                }
                // send all data
                const allData = await dataObtainCollections.find({})
                return NextResponse.json(allData)
            }
        } else { return unathorizeError(req) }
    } catch (error: any) {
        console.log(error.message)
        return serverError(req)
    }
}