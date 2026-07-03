import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Home = () => {
  const [messages, setMessages] = useState([
    { role: "ai", content: "How can I help you optimize your sales today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessageToGemini = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInput("");

    try {
      const payload = {
        contents: [{ parts: [{ text: message }] }],
        systemInstruction: {
          parts: [
            {
              text: "You are a professional POS Sales Assistant. Provide short, actionable business advice.",
            },
          ],
        },
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      const aiResponse = result.candidates[0].content.parts[0].text;

      setMessages([...newMessages, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.log(error);
      setMessages([
        ...newMessages,
        { role: "ai", content: "Error: Unable to connect to AI." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-primary-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-8 max-w-7xl mx-auto ">
        <div className="text-2xl font-bold tracking-tighter text-primary-500">
          Nodal POS
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-primary-500  hover:text-primary-800 transition"
          >
            Features
          </a>
          <Link
            to="/business/login"
            className="px-5 py-2 rounded-full border border-primary-700 hover:bg-primary-800 hover:text-white transition font-medium text-sm text-center text-primary-700"
          >
            Business Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <Logo />
          &nbsp;
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-primary-400 uppercase bg-primary-600 text-white rounded-full ml-4">
            Next generation POS
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
            Transaction power,
            <br />
            <span className="text-primary-500">simplified.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
            The enterprise-grade POS system built for high-volume retail.
            Integrated with AI to give you real-time business insights.
          </p>
          <Link
            to="/business/user/register"
            className="px-8 py-4 text-white bg-primary-600 hover:bg-primary-700 rounded-xl font-bold transition"
          >
            Get Started
          </Link>
        </div>

        {/* AI Chat Widget */}
        <div className="relative bg-primary-900 rounded-2xl p-6 border border-primary-900 shadow-2xl">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Ask AI Sales Assistant
          </h3>
          <div className="h-[400px] overflow-y-auto mb-4 p-4 bg-primary-950 rounded-xl border border-primary-800 text-sm space-y-4">
            {messages.map((msg, i) => (
              <p
                key={i}
                className={msg.role === "ai" ? "text-green-400" : "text-white"}
              >
                {msg.role === "ai" ? "AI: " : "You: "}
                {msg.content}
              </p>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && sendMessageToGemini(input)
              }
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-primary-800 text-white px-4 py-2 rounded-xl text-sm border border-primary-700 focus:outline-none focus:ring-2 focus:ring-white-500"
            />
            <button
              onClick={() => sendMessageToGemini(input)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700  rounded-xl font-bold transition text-sm text-white"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
