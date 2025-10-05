// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
    }

    // Correct Gemini / Generative Language API endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: {
          text: message,
        },
        temperature: 0.7,
        maxOutputTokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json({ error: "Gemini API returned error" }, { status: response.status });
    }

    const data = await response.json();

    // Text-Bison returns text in data.candidates[0].content
    const reply = data?.candidates?.[0]?.content || "No reply";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}