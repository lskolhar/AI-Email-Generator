import { NextResponse } from "next/server";

import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { prompt, tone } = body;

    // Validation
    if (!prompt) {
      return NextResponse.json(
        {
          error: "Prompt is required",
        },
        {
          status: 400,
        }
      );
    }

    // AI Prompt Engineering
    const aiPrompt = `
You are a professional email writing assistant.

Write a well-structured email.

Tone: ${tone}

User Request:
"${prompt}"

Return the response in this EXACT format:

Subject: <email subject>

Body:
<email body>
`;

    // Gemini Call
    const result = await model.generateContent(aiPrompt);

    const response = result.response.text();

    // Extract Subject + Body
    const subjectMatch = response.match(/Subject:(.*)/i);

    const bodyMatch = response.match(/Body:([\s\S]*)/i);

    const subject = subjectMatch?.[1]?.trim() || "No Subject";

    const emailBody = bodyMatch?.[1]?.trim() || response;

    return NextResponse.json({
      subject,
      body: emailBody,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}