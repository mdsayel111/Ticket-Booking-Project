const mongoose = require('mongoose');

export const connectDB = async () => {
    // @ts-ignore
    if (!global.isConnectDB) {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_DB_URL}`);
        // @ts-ignore
        global.isConnectDB = true
        return
    }
    return
}
