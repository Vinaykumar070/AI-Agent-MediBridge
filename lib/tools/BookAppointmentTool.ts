import { tool } from "@langchain/core/tools";
import { z } from "zod";
import DoctorModel from "../../models/Doctor";
import AppointmentModel from "../../models/BookAppointment";
import { sendEmail } from "./common"; // your existing SendGrid toole

export const bookAppointmentTool = tool(
    async ({ query, doctorId, patientName, appointmentDate }) => {
      try {
        const doctor = await DoctorModel.findById(doctorId).lean();
        if (!doctor) {
          return JSON.stringify({ error: "Doctor not found", query });
        }
  
        const newAppointment = await AppointmentModel.create({
          doctorId,
          patientName,
          appointmentDate: new Date(appointmentDate),
          status: 'booked',
        });
  
        await sendEmail.invoke({
          query: `Notify Dr. Vinay`,
          // query: `Notify Dr. ${doctor.name}`,
          fromEmails: 'yourclinic@digitalmr.ai',
          toEmails: 'vinaykumar.mkoudi@gmail.com',
          subject: `New Appointment Booked`,
          body: `Dear Dr. Vinay,\n\nYou have a new appointment with ${patientName} on ${new Date(appointmentDate).toLocaleString()}.\n\nRegards,\nDigital MR`,
        });
  
        return JSON.stringify({
          message: "Appointment created and doctor notified",
          appointmentId: newAppointment._id,
          query,
        });
      } catch (err: any) {
        console.error("bookAppointmentTool ERROR:", err);
        return JSON.stringify({ error: "Failed to book appointment", query });
      }
    },
    {
      name: "bookAppointment",
      description: "Book an appointment and send email to the doctor",
      schema: z.object({
        query: z.string().describe("The search query"),
        doctorId: z.string().describe("MongoDB _id of the doctor"),
        patientName: z.string(),
        appointmentDate: z.string().describe("ISO format date string"),
      }),
    }
  );