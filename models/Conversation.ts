import mongoose, { Schema, model } from "mongoose";

export interface ConversationDoc {
  _id: string;
  chatId: string;
  content: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationDoc>(
  {
    chatId: {
      type: String,
      required: [true, "chatId is required"],
    },
    content: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models?.Conversation ||
  model<ConversationDoc>("Conversation", ConversationSchema);
export default Conversation;
