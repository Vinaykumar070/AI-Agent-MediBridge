import mongoose, { Schema, model } from "mongoose";

export interface Appointment {
  _id: string;
  doctorId: string;
  patientName: string;
  appointmentDate: Date;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
}

const appointmentSchema = new Schema<Appointment>(
  {
    doctorId: { type: String, required: true },
    patientName: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel =
  mongoose.models?.Appointment || model<Appointment>("Appointment", appointmentSchema);

export default AppointmentModel;
