import mongoose, { Schema, model } from "mongoose";

export interface ChatsDocument {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSchema = new Schema<ChatsDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);

const  Chats  =  mongoose.models?.Chats  ||  model<ChatsDocument>('Chats', ChatSchema);
export default Chats;