import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
}
const db = process.env.MONGO_DB;
const password = process.env.MONGO_PASSWORD
//const uri = process.env.MONGODB_URI || `mongodb+srv://chatbot:chatbot@cluster0.h8j8p.mongodb.net/aiagent?retryWrites=true&w=majority&appName=Cluster0`;
const uri = process.env.MONGODB_URI || ``
const options = {};

export const client: MongoClient = new MongoClient(uri, options);

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI as string, options);
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error(`MongoDB ERROR:`, error);
        return Promise.reject(error ? error : 'MongoDB Connection Error...!');
    }
};