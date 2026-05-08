import { NextResponse } from "next/server";

import { model } from "@/lib/gemini";
import { GenerateEmailRequest } from "@/types/email";


export async function POST(req: Request) {
  try {
const body: GenerateEmailRequest = await req.json();
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

Return the response in this EXACT format, WITHOUT using bold or markdown formatting:

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

const subject =
  subjectMatch?.[1]?.trim() ||
  "Generated Email";

const emailBody =
  bodyMatch?.[1]?.trim() ||
  "Unable to parse email body properly.";

    return NextResponse.json({
      subject,
      body: emailBody,
    });
  } catch (error: any) {
  console.error(error);

  // Gemini Rate Limit
  if (error.message?.includes("429")) {
    return NextResponse.json(
      {
        error:
          "Rate limit exceeded. Please wait a moment and try again.",
      },
      {
        status: 429,
      }
    );
  }

  // Generic Failure
  return NextResponse.json(
    {
      error:
        "Failed to generate email. Please try again later.",
    },
    {
      status: 500,
    }
  );
}
}