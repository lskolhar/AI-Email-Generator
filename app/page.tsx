"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";
import EmailDisplay from "@/components/EmailDisplay";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    // Temporary fake response
    setTimeout(() => {
      setSubject("Interview Follow-Up");

      setBody(`Dear Hiring Manager,

Thank you for taking the time to interview me today.

I appreciate the opportunity and look forward to hearing from you.

Best regards,
Lakshmi`);

      setLoading(false);
    }, 2000);
  };

  const handleCopy = async () => {
    const text = `Subject: ${subject}\n\n${body}`;

    await navigator.clipboard.writeText(text);

    alert("Copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            tone={tone}
            setTone={setTone}
            onGenerate={handleGenerate}
            loading={loading}
          />

          {/* Right Panel */}
          <EmailDisplay
            subject={subject}
            body={body}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </main>
  );
}