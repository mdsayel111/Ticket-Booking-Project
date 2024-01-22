import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/BackendFiles/Utils";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { serverError } from "@/BackendFiles/OnError";

export const GET = async (req: NextRequest, { params }: any) => {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const dataObtainCollections = getCollection(req, params)
        // cheked, should return single data or multiple data
        await connectDB()
        if (id) {
            const singleData = await dataObtainCollections.findById(id)
            return NextResponse.json({ singleData })
        } else {
            // creat filter obj for find multiple data and send multiple data
            let filter: { date?: Date, email?: String } = {};
            const date: any = searchParams.get("date")
            const email: any = searchParams.get("date")
            if (searchParams.size > 0) {
                if (date === "all") {
                    filter.date = new Date(date)
                }
                if (email) {
                    filter.email = email
                }
                const multiData = await dataObtainCollections.find(filter)
                return NextResponse.json({ multiData: multiData })
            }
            // send all data
            const allData = await dataObtainCollections.find({})
            return NextResponse.json(allData)
        }
    } catch (error) {
        return serverError(req)
    }
}