import { eventCollection, movieCollection, sportCollection } from "@/CLient-And-Server-Shared-Files/Collections"
import { getCollection } from "@/CLient-And-Server-Shared-Files/Utils/Email"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"

export const getLatestData = async () => {
    await connectDB()
    const latestMovies = await movieCollection.aggregate([
        {
            $sort: { rating: -1 }
        },
        {
            $limit: 4
        },
    ])
    const latestEvents = await eventCollection.aggregate([
        {
            $sort: { date: -1 }
        },
        {
            $limit: 4
        },
    ])
    const latestSports = await sportCollection.aggregate([
        {
            $sort: { date: -1 }
        },
        {
            $limit: 4
        },
    ])
    return { latestMovies, latestEvents, latestSports }
}

export const getData = async (params: any, searchParams?: any) => {
    const id = searchParams && searchParams.id
    const dataObtainCollections = getCollection(params)

    // cheked, should return single data or multiple data
    await connectDB()
    if (id) {
        const singleData = await dataObtainCollections.findById(id)
        return { singleData }
    } else {
        // creat filter obj for find multiple data and send multiple data
        let filter: { date?: Date, email?: String, _id?: String } = {};
        const date: any = searchParams && searchParams.date
        const id: any = searchParams && searchParams.getid
        const email: any = searchParams && searchParams.email
        // add filter proberty
        if (searchParams) {
            if (date !== "all") {
                filter.date = new Date(date)
            }
            if (id) {
                filter._id = id
            }
            if (email) {
                filter.email = email
            }
            const multiData = await dataObtainCollections.find(filter)
            return { multiData }
        }
        // send all data
        const allData = await dataObtainCollections.find({})
        return { multiData: allData };
    }
}

export const getAddedItemsData = async (searchParams: any, params?: any) => {
    // const id = searchParams && searchParams.id
    const { email } = searchParams

    await connectDB()
    const movies = await movieCollection.find({ hostEmail: email })
    const events = await eventCollection.find({ hostEmail: email })
    const sports = await sportCollection.find({ hostEmail: email })
    return { movies, events, sports }
}

export const getAddedSingleItemsData = async (searchParams: any, params?: any) => {
    const { id } = params
    const { email } = searchParams

    console.log(email, id)

    const dataObtainCollection = await getCollection(params)

    await connectDB()
    const singleData = await dataObtainCollection.findOne({ hostEmail: email, _id: id })
    return { singleData }
}