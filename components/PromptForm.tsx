"use client";

import Loader from "./Loader";

interface PromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

export default function PromptForm({
  prompt,
  setPrompt,
  tone,
  setTone,
  onGenerate,
  loading,
}: PromptFormProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Create Your Email
      </h2>

      <div className="space-y-6">
        {/* Prompt */}
        <div>
          <label className="block mb-2 text-gray-300">
            Email Prompt
          </label>

         <textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Write a follow-up email after an interview..."
  maxLength={500}
  className="w-full min-h-[200px] rounded-xl bg-black/20 border border-white/10 p-4 outline-none focus:ring-2 focus:ring-blue-500"
/>

<p className="text-sm text-gray-400 mt-2 text-right">
  {prompt.length}/500 characters
</p>
        </div>

        {/* Tone */}
        <div>
          <label className="block mb-2 text-gray-300">
            Select Tone
          </label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-xl bg-black/20 border border-white/10 p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
  onClick={onGenerate}
  disabled={loading}
  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition rounded-xl py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
>
  {loading ? <Loader /> : "Generate Email"}
</button>
      </div>
    </div>
  );
}