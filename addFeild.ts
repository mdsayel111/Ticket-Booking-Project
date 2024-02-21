import { eventCollection, movieCollection, sportCollection } from "@/CLient-And-Server-Shared-Files/Collections"
import { connectDB } from "@/ServerFiles/Utils/MongoDB-Utils"
const mongoose = require('mongoose');

export const addFeild = async () => {
    try {
        const update = {
            $set: {
                location: 'Dhanmondi Lake, Road 32, Dhanmondi, Dhaka'
            },
        };
        // mongoose.connection.on('connected', () => {
        //     console.log('Mongoose connected to the database');
        // });

        // mongoose.connection.on('error', (err) => {
        //     console.error('Mongoose connection error:', err);
        // });
        await connectDB()
        // if (mongoose.connection.readyState == 1) {
        //     console.error('Not connected to the database');
        // }
        const result = await sportCollection.updateMany({}, update);
        console.log(result)

    } catch (error) {
        setTimeout(addFeild, 1000);
    }
}