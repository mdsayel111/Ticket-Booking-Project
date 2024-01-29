import { eventCollection, movieCollection, sportCollection } from "@/CLient-And-Server-Shared-Files/Collections";

// set collection for specific category
export const getCollection = (params: { category: any; }) => {
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