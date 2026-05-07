interface EmailDisplayProps {
  subject: string;
  body: string;
  onCopy: () => void;
}

export default function EmailDisplay({
  subject,
  body,
  onCopy,
}: EmailDisplayProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Generated Email</h2>

        <button
          onClick={onCopy}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
        >
          Copy
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400 mb-1">Subject</p>

          <div className="bg-black/20 rounded-lg p-3">
            {subject || "Your generated subject will appear here"}
          </div>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Email Body</p>

          <div className="bg-black/20 rounded-lg p-4 min-h-[300px] whitespace-pre-wrap">
            {body || "Generated email content will appear here"}
          </div>
        </div>
      </div>
    </div>
  );
}
