"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }), // Use the message state
      });

      const data = await res.json();

      if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse(data.content);
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
      <div className="text-center py-8 px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
          AI Chat Assistant
        </h1>
        <p className="text-lg opacity-90 font-light">Powered by Cohere AI</p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 pb-8 w-full flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-lg min-h-[300px] flex flex-col">
          {response ? (
            <div className="p-6 h-full">
              <div className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                AI Response:
              </div>
              <div className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap break-words">
                {response}
              </div>
            </div>
          ) : (
            <div className="p-6 text-gray-400 text-center italic flex items-center justify-center h-full min-h-[250px]">
              Your AI responses will appear here...
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base leading-relaxed resize-y font-inherit transition-colors duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          />
          <button
            onClick={handleChat}
            disabled={loading || !message.trim()}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 self-end min-w-[140px] hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg hover:enabled:shadow-indigo-400/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
