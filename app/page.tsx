"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";
import EmailDisplay from "@/components/EmailDisplay";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "Write a follow-up email after an interview..."
  );
  const [tone, setTone] = useState("Professional");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setSubject("");

      setBody("");

      const response = await fetch("/api/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate email"
        );
      }

      setSubject(data.subject);

      setBody(data.body);
    } catch (error: any) {
      console.error(error);

      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const text = `Subject: ${subject}\n\n${body}`;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-xl">
            {error}
          </div>
        </div>
      )}

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
            loading={loading}
            copied={copied}
          />
        </div>
      </div>
    </main>
  );
}