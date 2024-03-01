import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils";
import { serverError } from "@/ServerFiles/OnError";
import { getCollection } from "@/CLient-And-Server-Shared-Files/Utils/Email";


export const GET = async (req: NextRequest, { params }: any) => {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        const dataObtainCollections = getCollection(params)
        // cheked, should return single data or multiple data
        await connectDB()
        if (id) {
            const singleData = await dataObtainCollections.findById(id)
            return NextResponse.json({ singleData })
        } else {
            // creat filter obj for find multiple data and send multiple data
            let filter: { date?: object, email?: String } = {};
            const date: any = searchParams.get("date")
            const email: any = searchParams.get("email")
            // add filter proberty
            if (searchParams.size > 0) {
                if (date !== "all") {
                    // make start date and end date for filter
                    const startDate = new Date(date)
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 1);

                    console.log(startDate, endDate)

                    filter.date = {
                        $gte: startDate,
                        $lt: endDate
                    }
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
    } catch (error: any) {
        return serverError(req)
    }
}