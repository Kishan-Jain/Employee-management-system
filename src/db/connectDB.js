import mongoose from "mongoose";

const DB_uri = process.env.DATABASE_URI
const DB_name = process.env.DATABASE_NAME


export const connectdb = async () => {
    try {
        const DB = await mongoose.connect(`${DB_uri}/${DB_name}`);
        console.log(`DataBase connected successfully! \n DB Host : ${DB.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

