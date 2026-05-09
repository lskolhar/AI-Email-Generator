import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Email from "@/models/Email";

export async function GET() {
  try {
    await dbConnect();
    const emails = await Email.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Failed to fetch emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch email history" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { prompt, tone, subject, body: emailBody } = body;

    if (!prompt || !tone || !subject || !emailBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEmail = await Email.create({
      prompt,
      tone,
      subject,
      body: emailBody,
    });

    return NextResponse.json({ email: newEmail }, { status: 201 });
  } catch (error) {
    console.error("Failed to save email:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
