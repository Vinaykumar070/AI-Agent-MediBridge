import DoctorModel from "../models/Doctor";
import AppointmentModel from "../models/BookAppointment";
import { sendEmail } from "../lib/tools/common"; // adjust path if needed

export interface AppointmentInput {
  doctorId: string;
  patientName: string;
  appointmentDate: string; // ISO date string
  query?: string;
}

export async function bookAppointmentService({
  doctorId,
  patientName,
  appointmentDate,
  query = "Appointment booking",
}: AppointmentInput) {
  try {
    // 1. Get the doctor info
    const doctor = await DoctorModel.findById(doctorId).lean();
    if (!doctor) {
      return {
        success: false,
        message: "Doctor not found",
      }
    }

    // 2. Create the appointment
    const appointment = await AppointmentModel.create({
      doctorId,
      patientName,
      appointmentDate: new Date(appointmentDate),
      status: "booked",
    });

    // 3. Send email to doctor
    await sendEmail.invoke({
      query,
      fromEmails: "yourclinic@digitalmr.ai",
      toEmails: 'vinaykumar.mkoudi@gmail.com',
      subject: `New Appointment Booked`,
      body: `Dear Dr. vinay,\n\nYou have a new appointment with ${patientName} on ${new Date(appointmentDate).toLocaleString()}.\n\nRegards,\nDigital MR`,
    });

    return {
      success: true,
      message: "Appointment booked and email sent",
      appointmentId: appointment._id,
    };
  } catch (error: any) {
    console.error("bookAppointmentService error:", error);
    return {
      success: false,
      message: "Error booking appointment",
      error: error.message,
    };
  }
}
