
import { client, connectDB } from "@/lib/mongoClient";
import { NextResponse } from "next/server";
import Chat from "@/models/Chats";
import { getChats } from "@/services/Chats"
import Doctor from "@/models/Doctor";

const db = client.db("test");

export async function POST(req: Request) {
    await connectDB();

    try {
        // const data = await db.collection("Chat").find({}).toArray();
        const { name } = await req.json();
        try {
            const save = new Chat({ name });
            const data = await save.save();
            return NextResponse.json(
                { data } as const,
                { status: 200 }
            );
        } catch (e) {
            console.log(e);
        }
    }
    catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" } as const,
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    await connectDB();
    try {
        const chatData = await getChats();
        return NextResponse.json(
            { data: chatData } as const,
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" } as const,
            { status: 500 }
        );
    }
}


// export async function POST(req: Request) {
//   await connectDB();
//   const body = await req.json();
//   const { city, specialty } = body;

//   try {
//     const filter: any = {};
//     if (city) filter.city = city;
//     if (specialty) filter.specialty = specialty;

//     const doctors = await Doctor.find(filter).limit(50); // limit to 50 results
//     return NextResponse.json(doctors);
//   } catch (err: any) {
//     console.error('List Doctors ERROR:', err);
//     return NextResponse.json({ error: err.message || "Error listing doctors" }, { status: 500 });
//   }
// }


///////////////////////////////////////

// Vinay Changes


// import { client, connectDB } from "@/lib/mongoClient";
// import { NextResponse } from "next/server";
// import Appointment from "@/models/Appointment"; // new model for appointments
// import Doctor from "@/models/Doctor"; // doctor model
// import { getDoctorByName, createAppointment } from "@/services/DoctorServices";
// import { OpenAI } from 'openai';

// const db = client.db("test");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req: Request) {
//   await connectDB();

//   try {
//     const { message, userRole } = await req.json();

//     // 1. Ask OpenAI to analyze the user message
//     const aiResponse = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'You are an assistant for an MR-Doctor appointment platform. Reply only with JSON: { action, doctorName, date, time }.' },
//         { role: 'user', content: message }
//       ],
//       temperature: 0.2,
//     });

//     const parsed = JSON.parse(aiResponse.choices[0].message.content || '{}');
//     const { action, doctorName, date, time } = parsed;

//     if (action === 'bookAppointment') {
//       const doctor = await getDoctorByName(doctorName);

//       if (!doctor) {
//         return NextResponse.json({ reply: `Doctor ${doctorName} not found.` }, { status: 404 });
//       }

//       const appointment = new Appointment({
//         doctorId: doctor._id,
//         mrId: "sampleMRId", // You can later replace this with session ID
//         date,
//         time,
//       });

//       await appointment.save();

//       return NextResponse.json({ reply: `✅ Appointment booked with Dr. ${doctorName} on ${date} at ${time}.` }, { status: 200 });
//     }

//     return NextResponse.json({ reply: "Sorry, I didn't understand your request." }, { status: 400 });
//   }
//   catch (error) {
//     console.error("Error in agent API:", error);
//     return NextResponse.json(
//       { error: "Failed to process AI agent request" } as const,
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: Request) {
//   return NextResponse.json({ message: "Hello! I am the MR-Doctor AI Agent." });
// }
