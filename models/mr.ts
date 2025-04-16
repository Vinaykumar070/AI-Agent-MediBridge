import mongoose, { Schema, model } from "mongoose";

export interface MR {
  _id: string;
  name: string;
  company: string;
  region: string;
  email: string;
  phone: string;
}

const mrSchema = new Schema<MR>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    region: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MRModel = mongoose.models?.MR || model<MR>("MR", mrSchema);

export default MRModel;
