import { Bot, X, Send } from "lucide-react";
import React, { useState } from "react";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      content:
        "Hi! I am Nodal AI. How can I help you manage your POS system today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput;
    // Add user message
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setChatInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: {
              parts: [
                {
                  text: "You are a professional Nodal POS assistant. Keep answers short and helpful.",
                },
              ],
            },
          }),
        },
      );

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      setChatMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Sorry, I'm having trouble connecting right now. Please check your API key.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isChatOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-96 h-[450px] bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-300 mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 origin-bottom-right">
          {/* Chat Header */}
          <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-600" />
              </div>
              <span className="font-semibold text-slate-900">
                Nodal AI Assistant
              </span>
            </div>
            <button
              title="chatOpen"
              onClick={() => setIsChatOpen(false)}
              className="text-slate-500 hover:text-slate-900 transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white rounded-tr-sm shadow-md shadow-cyan-600/20"
                      : "bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Field */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your sales..."
                className="flex-1 bg-white text-sm text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-sm"
              />
              <button
                title="chatbot"
                type="submit"
                disabled={!chatInput.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shrink-0 shadow-md shadow-cyan-600/20"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
          isChatOpen
            ? "bg-white text-slate-600 border border-slate-200 shadow-lg"
            : "bg-cyan-600 text-white shadow-cyan-600/30"
        }`}
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </>
  );
}
