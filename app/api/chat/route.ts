import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // optional, if using streaming or edge functions

export async function POST(req: NextRequest) {
  const apiKey = process.env.COHERE_API_KEY;

  if (!apiKey) {
    console.error("Missing COHERE_API_KEY");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const { prompt } = await req.json();

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "command-r-plus", // Updated to a stable model
        message: prompt, // Cohere uses 'message' not 'messages'
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Cohere error:", err);
      return NextResponse.json(
        { error: "Cohere API error" },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ content: result.text }); // Cohere returns 'text' not 'choices'
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
