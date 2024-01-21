import { eventCollection, movieCollection, sportCollection } from "@/BackendFiles/Collections"
import { connectDB } from "@/BackendFiles/Utils/MongoDB-Utils"
const mongoose = require('mongoose');

export const addFeild = async () => {
    try {
        const update = {
            $set: {
                price: 500
            },
        };
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to the database');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        await connectDB()
        if (mongoose.connection.readyState == 1) {
            console.error('Not connected to the database');
        }
        const result = await eventCollection.updateMany({}, update);
        console.log(result)

    } catch (error) {
        console.log(error)
        setTimeout(addFeild, 1000);
    }
}