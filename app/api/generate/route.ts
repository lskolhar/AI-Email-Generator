import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { prompt, tone } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
      return Response.json(
        { error: "Prompt is too short or missing" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Server misconfiguration: missing API key" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are an expert email writer. Generate a ${tone || "Professional"} email based on the following request.

Respond with ONLY valid JSON in this exact format (no markdown, no code fences, no extra text):
{"subject":"<email subject here>","body":"<full email body here>"}

User request: ${prompt.trim()}`;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text().trim();

    // Strip markdown code fences if the model wraps the JSON
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: { subject: string; body: string };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return Response.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 502 }
      );
    }

    if (!parsed.subject || !parsed.body) {
      return Response.json(
        { error: "AI response was incomplete. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ subject: parsed.subject, body: parsed.body });
  } catch (error: any) {
    console.error("[/api/generate]", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}