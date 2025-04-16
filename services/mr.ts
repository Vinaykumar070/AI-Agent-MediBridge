"use server";
import { connectDB, client } from "@/lib/mongoClient";
import MR from "@/models/mr"; 
import Appointment from "@/models/Appointment"; 

const db = client.db("ai-charts");

export const createMRProfile = async (body: any) => {
  await connectDB();
  const { name, phone, email, territory } = body;
  try {
    const newMR = new MR({ name, phone, email, territory });
    const data = await newMR.save();
    return JSON.parse(JSON.stringify(data));
  } catch (err: any) {
    console.error('Create MR Profile ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const sendAppointmentRequest = async (body: any) => {
  await connectDB();
  const { doctorId, dateTime, message } = body;
  try {
    const appointment = new Appointment({ doctorId, dateTime, message, status: "pending" });
    const data = await appointment.save();
    return JSON.parse(JSON.stringify(data));
  } catch (err: any) {
    console.error('Send Appointment Request ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const sendBrochureToDoctor = async (body: any) => {
  await connectDB();
  const { doctorId, brochureLink } = body;
  try {
    // Logic to send brochure (could be saved in DB or sent via notification)
    return { success: true, message: `Brochure sent to Doctor ${doctorId}`, brochureLink };
  } catch (err: any) {
    console.error('Send Brochure ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const sendMessageToDoctor = async (body: any) => {
  await connectDB();
  const { doctorId, message } = body;
  try {
    // Logic to send message (could be saved in chat/message table)
    return { success: true, message: `Message sent to Doctor ${doctorId}`, text: message };
  } catch (err: any) {
    console.error('Send Message ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};

export const listAppointmentsMR = async (body: any) => {
  await connectDB();
  const { status } = body;
  try {
    const filter: any = {};
    if (status) filter.status = status;
    const appointments = await Appointment.find(filter);
    return JSON.parse(JSON.stringify(appointments));
  } catch (err: any) {
    console.error('List MR Appointments ERROR:', err);
    throw new Error(err?.message ? err?.message : err);
  }
};


export const createAppointment = async (body: any) => {
  await connectDB();
  try {
    const appointment = new Appointment(body);
    const saved = await appointment.save();
    return saved;
  } catch (err: any) {
    console.error("Create Appointment Error:", err);
    throw new Error(err?.message || "Error creating appointment");
  }
};

export const getAppointmentsForMR = async (mrId: string) => {
  await connectDB();
  try {
    const appointments = await Appointment.find({ mrId }).sort({ appointmentDate: 1 });
    return JSON.parse(JSON.stringify(appointments));
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Error fetching MR appointments");
  }
};

export const getAppointmentsForDoctor = async (doctorId: string) => {
  await connectDB();
  try {
    const appointments = await Appointment.find({ doctorId }).sort({ appointmentDate: 1 });
    return JSON.parse(JSON.stringify(appointments));
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Error fetching Doctor appointments");
  }
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  await connectDB();
  try {
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    return updated;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Error updating appointment");
  }
};

export const deleteAppointment = async (id: string) => {
  await connectDB();
  try {
    const deleted = await Appointment.findByIdAndDelete(id);
    return deleted;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Error deleting appointment");
  }
};
