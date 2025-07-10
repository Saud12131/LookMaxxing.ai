import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { systemInstruction } from "@/prompt";
import axios from "axios";
import prisma from "@/lib/prisma";
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"]; 

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { prompt, image } = await request.json();

  if (!prompt || !image) {
    return NextResponse.json(
      { error: "Both prompt and image are required" },
      { status: 400 }
    );
  }

  // Validate image format
  const mimeType = detectMimeType(image);
  if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return NextResponse.json(
      { error: `Unsupported image type. Supported types: ${ALLOWED_MIME_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction
  });

  try {
    // Generate enhancement instructions from Gemini
    const parts = [
      { 
        text: `The user wants to enhance a portrait image. Here are their requirements: "${prompt}".giving you real 
        image inhance it as the requirnment  `
      },
      {
        inlineData: {
          data: extractBase64Data(image),
          mimeType: mimeType
        }
      }
    ];

    const result = await model.generateContent({ contents: [{ role: "user", parts }] });
    const enhancementInstructions = result.response.text();

    if (!enhancementInstructions) {
      return NextResponse.json({ error: "No enhancement instructions generated" }, { status: 500 });
    }

    // CORRECTED: Use the proper endpoint and payload structure
    try {
      // For standard enhancement (SD1.5 model)
      const response = await axios.post(
        "https://api.imagepig.com/", // Core endpoint for image generation
        {
          prompt: enhancementInstructions,
          image_base64: extractBase64Data(image),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": process.env.IMAGEPIG_API,
          },
        }
      );
      const result = await prisma.result.create({
        data:{
          UserImage:image,
          UserPrompt:prompt,
          AiImage:response.data.image_data,
          AiResponse:enhancementInstructions,
          UserID:"user12"
        }
      })
      return NextResponse.json({ 
       success:true,id:result.id
      });
    } catch (err: any) {
      console.error("ImagePig API error:", err?.response?.data || err.message);
      return NextResponse.json(
        { 
          error: "ImagePig API request failed",
          details: err?.response?.data || err.message 
        },
        { status: err?.response?.status || 500 }
      );
    }
  } catch (e: any) {
    console.error("Gemini error:", e);
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

// Helper functions
function detectMimeType(base64: string): string | null {
  const mimeMatch = base64.match(/^data:(image\/\w+);base64,/);
  return mimeMatch ? mimeMatch[1] : null;
}

function extractBase64Data(base64: string): string {
  return base64.replace(/^data:image\/\w+;base64,/, "");
}
