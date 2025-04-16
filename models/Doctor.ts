import mongoose, { Schema, model } from "mongoose";

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  email: string;
  phone: string;
}

const doctorSchema = new Schema<Doctor>(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.DoctorModal) {
  delete mongoose.models.DoctorModal;
}
const DoctorModel = mongoose.models?.DoctorsList || model<Doctor>("DoctorsList", doctorSchema);


export default DoctorModel;
