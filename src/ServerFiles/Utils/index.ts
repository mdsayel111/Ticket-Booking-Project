import { NextRequest } from "next/server";
import { connectDB } from "./MongoDB-Utils";
import { eventCollection, movieCollection, sportCollection } from "../Collections";

// set collection for specific category
export const getCollection = (req: NextRequest, params: { category: any; }) => {
    const { category } = params

    // Setting the specific collection, from which collection information can be obtained
    let dataObtainCollections = null
    switch (category) {
        case "movies":

            dataObtainCollections = movieCollection
            break;
        case "sports":
            dataObtainCollections = sportCollection
            break;
        case "events":
            dataObtainCollections = eventCollection
            break;
    }
    return dataObtainCollections
}

// set filter obj for data
export const getFilterObject = async (req: NextRequest) => {

}