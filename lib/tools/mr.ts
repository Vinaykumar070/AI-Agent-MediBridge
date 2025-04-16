import { tool } from "@langchain/core/tools";
import { z } from "zod";
import {
  createMRProfile,
  sendAppointmentRequest,
  sendBrochureToDoctor,
  sendMessageToDoctor,
  listAppointmentsMR
} from "@/services/mr";

export const createMROnboarding = tool(
  async ({ name, phone, email, territory }) => {
    try {
      const response = await createMRProfile({ name, phone, email, territory });
      return JSON.stringify(response);
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Failed to create MR profile" });
    }
  },
  {
    name: "createMROnboarding",
    description: "Create a new Medical Representative profile.",
    schema: z.object({
      name: z.string(),
      phone: z.string(),
      email: z.string(),
      territory: z.string()
    }),
  }
);

export const sendAppointmentRequestTool = tool(
  async ({ doctorId, dateTime, message }) => {
    try {
      const response = await sendAppointmentRequest({ doctorId, dateTime, message });
      return JSON.stringify(response);
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Failed to send appointment request" });
    }
  },
  {
    name: "sendAppointmentRequestTool",
    description: "Send an appointment request to a Doctor.",
    schema: z.object({
      doctorId: z.string(),
      dateTime: z.string().describe("ISO date format like '2025-04-10T10:00:00'"),
      message: z.string().optional()
    }),
  }
);

export const sendBrochureTool = tool(
  async ({ doctorId, brochureLink }) => {
    try {
      const response = await sendBrochureToDoctor({ doctorId, brochureLink });
      return JSON.stringify(response);
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Failed to send brochure" });
    }
  },
  {
    name: "sendBrochureTool",
    description: "Send a product brochure (PDF/link) to a Doctor.",
    schema: z.object({
      doctorId: z.string(),
      brochureLink: z.string().url()
    }),
  }
);

export const sendMessageTool = tool(
  async ({ doctorId, message }) => {
    try {
      const response = await sendMessageToDoctor({ doctorId, message });
      return JSON.stringify(response);
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Failed to send message" });
    }
  },
  {
    name: "sendMessageTool",
    description: "Send a text message to a Doctor.",
    schema: z.object({
      doctorId: z.string(),
      message: z.string()
    }),
  }
);

export const listAppointmentsMRTool = tool(
  async ({ status }) => {
    try {
      const appointments = await listAppointmentsMR({ status });
      return JSON.stringify(appointments);
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Failed to fetch MR appointments" });
    }
  },
  {
    name: "listAppointmentsMRTool",
    description: "List MR's appointments by status (pending, confirmed, rejected).",
    schema: z.object({
      status: z.enum(["pending", "confirmed", "rejected"]).optional()
    }),
  }
);
