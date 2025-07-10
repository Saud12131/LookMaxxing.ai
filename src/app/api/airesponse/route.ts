export const dynamic = "force-dynamic";
export const runtime = "edge";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { systemInstruction } from "@/prompt";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { prompt, userID } = await request.json();

  if (!prompt || !userID) {
    return NextResponse.json(
      { error: "Both prompt and userid are required" },
      { status: 400 }
    );
  }
  const previousMessages = await prisma.chat.findMany({
    where: { userID },
    orderBy: { createdAt: "asc" },
  });
  const history = previousMessages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));
  history.push({
    role: "user",
    parts: [{ text: prompt }],
  });  
  // Save user message to database
  await prisma.chat.create({
    data: {
      userID, 
      role: "user",
      content: prompt,
    }
  });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  });

  try {
    const streamingResponse = await model.generateContentStream({
      contents: history,
    });

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        
        // Stream chunks to client
        for await (const chunk of streamingResponse.stream) {
          const text = chunk.text();
          fullResponse += text;
          controller.enqueue(new TextEncoder().encode(text));
        }

        // Save assistant response after streaming completes
        try {
          await prisma.chat.create({
            data: {
              userID,
              role: "assistant",
              content: fullResponse,
            }
          });
        } catch (dbError) {
          console.error("Database save error:", dbError);
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked"
      },
    });
  }
  catch (err: any) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: err.message || "Content generation failed" },
      { status: 500 }
    );
  }
}
