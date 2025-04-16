
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";

// import { client, connectDB } from "@/lib/mongoClient";
// import Conversation from "@/models/Conversation";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await connectDB();
//     try {
//         const { chatid } = req.query;
//         console.log(req.query)
//         const conversation = await Conversation.findOne({ chatId: chatid });
//         return NextResponse.json(
//             { data: [1,2,3] } as const,
//             { status: 200 }
//         );
//     }
//     catch (error) {
//         console.error("Error in chat API:", error);
//         return NextResponse.json(
//             { error: "Failed to process chat request" } as const,
//             { status: 500 }
//         );
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoClient";
import Conversation from "@/models/Conversation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    const { chatId } = req.query;

    if (!chatId) {
      return res.status(400).json({ error: "Missing chatId parameter" });
    }

    const conversation = await Conversation.findOne({ chatId });

    // Return the actual conversation data instead of hardcoded array
    return res.status(200).json({ data: conversation || [] });
  } catch (error) {
    console.error("Error in chat API:", error);
    return res.status(500).json({ error: "Failed to process chat request" });
  }
}