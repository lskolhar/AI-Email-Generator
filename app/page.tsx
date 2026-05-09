"use client";

import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Navbar from "@/components/Navbar";
import PromptForm from "@/components/PromptForm";
import EmailDisplay from "@/components/EmailDisplay";
import HistorySidebar from "@/components/HistorySidebar";

import { EmailHistoryItem } from "@/types/history";

export default function Home() {
  const [prompt, setPrompt] = useState(
    "Write a follow-up email after an interview..."
  );

  const [tone, setTone] = useState("Professional");

  const [subject, setSubject] = useState("");

  const [body, setBody] = useState("");

  const [displayedBody, setDisplayedBody] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState<
    EmailHistoryItem[]
  >([]);

  // Load history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem(
      "email-history"
    );

    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    let index = 0;

    setDisplayedBody("");

    if (!body) return;

    const interval = setInterval(() => {
      setDisplayedBody(body.slice(0, index));

      index++;

      if (index > body.length) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [body]);

  const handleGenerate = async () => {
    if (loading) return;
    if (!navigator.onLine) {
  setError("No internet connection");

  return;
}
if (!prompt.trim()) {
  setError("Please enter an email request");

  return;
}

if (prompt.trim().length < 10) {
  setError("Prompt should be more descriptive");

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
      if (!data.subject || !data.body) {
  throw new Error("Invalid AI response");
}

      setSubject(data.subject);

      setBody(data.body);

      // Save to history
      const newHistoryItem: EmailHistoryItem = {
        id: crypto.randomUUID(),
        prompt,
        tone,
        subject: data.subject,
        body: data.body,
        createdAt: new Date().toISOString(),
      };

      const updatedHistory = [
        newHistoryItem,
        ...history,
      ];

      setHistory(updatedHistory);

      localStorage.setItem(
        "email-history",
        JSON.stringify(updatedHistory)
      );
    } catch (error: any) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

const handleCopy = async () => {
  try {
    const text = `Subject: ${subject}\n\n${body}`;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error(error);

    setError("Failed to copy email");
  }
};

  // Select history item
  const handleHistorySelect = (
    item: EmailHistoryItem
  ) => {
    setPrompt(item.prompt);

    setTone(item.tone);

    setSubject(item.subject);

    setBody(item.body);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8" style={{ height: 'calc(100vh - 200px)' }}>
          {/* History Sidebar */}
          <div className="xl:col-span-1 overflow-y-auto custom-scroll rounded-2xl">
            <HistorySidebar
              history={history}
              onSelect={handleHistorySelect}
            />
          </div>

          {/* Prompt Form */}
          <div className="xl:col-span-1 overflow-y-auto custom-scroll rounded-2xl">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              tone={tone}
              setTone={setTone}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </div>

          {/* Email Display */}
          <div className="xl:col-span-2 overflow-y-auto custom-scroll rounded-2xl">
            <EmailDisplay
              subject={subject}
              body={displayedBody}
              onCopy={handleCopy}
              loading={loading}
              copied={copied}
            />
          </div>
        </div>
      </div>
    </main>
  );
}