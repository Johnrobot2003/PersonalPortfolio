// app/api/test/route.ts

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: "What are you",
      },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}