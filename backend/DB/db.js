import mongoose from "mongoose"
import {DB_NAME} from '../src/constants.js'

const DBConnection =  async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connected !!!");

    } catch (error) {
        console.log("MongoDB connection Failed", error);
    }
}

export default DBConnection;