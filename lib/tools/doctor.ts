import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllDoctors, createDoctors } from "@/services/doctor";
import { Hospital } from "lucide-react";

export const listDoctorsTool = tool(
  async ({ city, specialty }) => {
    try {
      const doctors = await getAllDoctors();

      const filteredDoctors = doctors.filter((doctor: any) => {
        let matches = true;
        if (city) {
          matches = matches && doctor.city.toLowerCase() === city.toLowerCase();
        }
        if (specialty) {
          matches = matches && doctor.specialty.toLowerCase() === specialty.toLowerCase();
        }
        return matches;
      });

      return JSON.stringify(filteredDoctors);
    } catch (e) {
      console.error('listDoctorsTool ERROR:', e);
      return JSON.stringify({ error: "Failed to fetch doctors" });
    }
  },
  {
    name: "listDoctorsTool",
    description: "List doctors based on optional filters like city and specialty.",
    schema: z.object({
      query: z.string().describe("The search query"),
      name:z.string(),
      city: z.string().optional(),
      specialty: z.string().optional(),
    }),
  }
);

const doctorSchema = z.object({
  query: z.string().describe("The search query"),
  data: z.object({
    name: z.string(),
    specialty: z.string(), // instead of position
    email: z.string(),
    mobile: z.number(),// if you still want
    city: z.string(),
    hospital: z.string()
  }).describe("New Doctor Details.")
});

export const createDoctorsTool = tool(
  async () => {
    try {
      const createdDoctors = await createDoctors();
      return JSON.stringify(createdDoctors);
    } catch (e) {
      console.error('createDoctorsTool ERROR:', e);
      return JSON.stringify({ error: "Failed to create doctors" });
    }
  },
  {
    name: "createDoctorsTool",
    description: "Creates sample doctors in the database using dummy data.",
    schema: doctorSchema,
  }
);


// export const createDoctorOnboarding = tool(
//   async ({ name, specialty, hospital, city, email, phone }) => {
//     try {
//       const response = await createDoctorProfile({ name, specialty, hospital, city, email, phone });
//       return JSON.stringify(response);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify({ error: "Failed to create Doctor profile" });
//     }
//   },
//   {
//     name: "createDoctorOnboarding",
//     description: "Create a new Doctor profile.",
//     schema: z.object({
//       name: z.string(),
//       specialty: z.string(),
//       hospital: z.string(),
//       city: z.string(),
//       email: z.string(),
//       phone: z.string()
//     }),
//   }
// );

// export const respondAppointmentRequestTool = tool(
//   async ({ appointmentId, response }) => {
//     try {
//       const result = await respondToAppointmentRequest({ appointmentId, response });
//       return JSON.stringify(result);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify({ error: "Failed to respond to appointment" });
//     }
//   },
//   {
//     name: "respondAppointmentRequestTool",
//     description: "Doctor responds to an appointment request (accept/reject).",
//     schema: z.object({
//       appointmentId: z.string(),
//       response: z.enum(["accept", "reject"])
//     }),
//   }
// );

// export const listAppointmentsDoctorTool = tool(
//   async ({ status }) => {
//     try {
//       const appointments = await listAppointmentsDoctor({ status });
//       return JSON.stringify(appointments);
//     } catch (e) {
//       console.error(e);
//       return JSON.stringify({ error: "Failed to fetch Doctor appointments" });
//     }
//   },
//   {
//     name: "listAppointmentsDoctorTool",
//     description: "List Doctor's appointments by status (pending, confirmed, rejected).",
//     schema: z.object({
//       status: z.enum(["pending", "confirmed", "rejected"]).optional()
//     }),
//   }
// );
