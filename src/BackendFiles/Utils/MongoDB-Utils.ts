const mongoose = require('mongoose');

export const connectDB = async () => {
    // @ts-ignore
    if (!global.isConnectDB) {
        console.log("connected successful")
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DB_URL}`);
        // @ts-ignore
        global.isConnectDB = true
    }
    console.log("already connect")
    return
}
