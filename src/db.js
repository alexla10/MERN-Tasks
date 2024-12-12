import mongoose from 'mongoose'
import { DB_URL } from './config.js';


export const conectDB = async () =>{
    try {
        await mongoose.connect(`${DB_URL}`);
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}