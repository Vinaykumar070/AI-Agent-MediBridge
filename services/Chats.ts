"use server"
import { connectDB, client } from "@/lib/mongoClient";
import Chats from "@/models/Chats";
const db = client.db("test");

export const getChats = async () => {
    try {
        const chatData = await Chats.find({}).sort({ 'createdAt': -1 });
        return chatData
    } catch (err) {
        console.log(err);
    }
};

export const saveChat = async (body: any) => {
    const { name, desc } = await body;
    try {
        const save = new Chats({ name, desc });
        const data = await save.save();
        return data
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}

export const deleteChat = async (id: string | number) => {
    try {
        const deleteChat = await Chats.findOneAndDelete({ _id: id });
        return deleteChat;
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}

export const deleteAll = async () => {
    try {
        const deleteAll = await Chats.deleteMany();
        return deleteAll;
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}