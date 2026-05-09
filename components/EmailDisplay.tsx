import { Copy } from "lucide-react";
interface EmailDisplayProps {
  subject: string;
  body: string;
  onCopy: () => void;
  loading: boolean;
  copied: boolean;
}

export default function EmailDisplay({
  subject,
  body,
  onCopy,
  loading,
  copied,
}: EmailDisplayProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Generated Email
        </h2>

        <button
  onClick={onCopy}
  disabled={!body}
  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Copy size={18} />
  {copied ? "Copied!" : "Copy"}
</button>
      </div>

      <div className="space-y-4">
        {/* Subject */}
        <div>
          <p className="text-gray-400 mb-1">Subject</p>

          <div className="bg-black/20 rounded-lg p-3">
            {subject || "Your generated subject will appear here"}
          </div>
        </div>

        {/* Body */}
        <div>
          <p className="text-gray-400 mb-1">
            Email Body
          </p>

          <div className="bg-black/20 rounded-lg p-4 min-h-[200px] whitespace-pre-wrap">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
            ) : body ? (
              body
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
Start by entering a prompt and generating an email
</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}