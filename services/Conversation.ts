"use server";
import { connectDB, client } from "@/lib/mongoClient";
import Conversation from "@/models/Conversation";
const db = client.db("ai-charts");

export const getConversations = async (chatId: string | number) => {
  try {
    const chatData = await Conversation.find({ chatId });
    return JSON.parse(JSON.stringify(chatData));
  } catch (err) {
    console.log(err);
  }
};

export const saveConversation = async (body: any) => {
  const { chatId, content, role } = await body;
  try {
    const save = new Conversation({ chatId, content, role });
    const data = await save.save();
    return data;
  } catch (err: any) {
    console.log('Save Conversation ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const getConversation = async (id: string | number) => {
  try {
    const find = await Conversation.find({ _id: id });
    return find;
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const deleteConversation = async (id: string | number) => {
  try {
    const deleteChat = await Conversation.findOneAndDelete({ _id: id });
    return deleteChat;
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const deleteAll = async (chatId: string | number) => {
  try {
    const deleteAll = await Conversation.deleteMany({chatId: chatId});
    return deleteAll;
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.message ? err?.message : err);
  }
};
