import { eventCollection, movieCollection, sportCollection } from "@/BackendFiles/Collections";
import { serverError } from "@/BackendFiles/OnError";
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils";
import { NextRequest, NextResponse } from "next/server";

// latest movie,sports and event API
export const GET = async (req: NextRequest) => {
    try {
        await connectDB()
        const latestMovies = await movieCollection.aggregate([
            {
                $sort: { rating: -1 }
            },
            {
                $limit: 3
            },
        ])
        const latestEvents = await eventCollection.aggregate([
            {
                $sort: { date: -1 }
            },
            {
                $limit: 3
            },
        ])
        const latestSports = await sportCollection.aggregate([
            {
                $sort: { date: -1 }
            },
            {
                $limit: 3
            },
        ])
        return NextResponse.json({ events: latestEvents, sports: latestSports, movies: latestMovies })
    } catch (error) {
        return serverError(req)
    }
};