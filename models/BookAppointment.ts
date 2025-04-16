import mongoose, { Schema, model } from "mongoose";

export interface Appointment {
  doctorId: string;
  patientName: string;
  appointmentDate: Date;
  status: string;
}

const appointmentSchema = new Schema<Appointment>(
  {
    // doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, default: "booked" },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.models.Appointment || model<Appointment>("Booked-Appointment", appointmentSchema);

export default AppointmentModel;
