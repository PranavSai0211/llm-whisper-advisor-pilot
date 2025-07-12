// src/components/OllamaAssistant.tsx
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Mic, Globe } from "lucide-react";
import { translateText } from "@/services/libreTranslate";

const models = ["llama3", "mistral", "phi"];
const languages = ["en", "hi", "te"];

const SYSTEM_CONTEXT = `
You are the AI assistant for the 'LLM Whisper Advisor' app.

This app recommends suitable AI models for different hardware configurations based on RAM (4GB to 32GB+), such as TinyLlama, Phi-2, LLaMA3, Mistral, and Gemma. It categorizes models by quantization levels (4-bit, 8-bit), use cases (chat, reasoning, code, multimodal), and context length.

It also includes deployment tool links (Ollama, LM Studio, GPT4All), performance charts, and download size insights. Users can switch models (llama3, mistral, phi), use voice input, and get output translated to Hindi or Telugu.

Always reply with awareness of the app’s capabilities. If asked “which model for 8GB RAM” or “how to run locally,” explain based on the app’s guidance.
`;

export const OllamaAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("llama3");
  const [language, setLanguage] = useState("en");
  const [recording, setRecording] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    controllerRef.current = new AbortController();

    const fullPrompt = `${SYSTEM_CONTEXT}\n\nUser: ${prompt}`;

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: fullPrompt, stream: true }),
      signal: controllerRef.current.signal,
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      try {
        const jsonLines = chunk.trim().split("\n");
        for (const line of jsonLines) {
          const parsed = JSON.parse(line);
          const token = parsed.response || "";
          fullText += token;
          setResponse(fullText);
        }
      } catch (e) {
        console.error("Streaming parse error:", e);
      }
    }

    if (language !== "en") {
      try {
        const translated = await translateText(fullText, language);
        setResponse(translated);
      } catch (err) {
        console.error("Translation failed:", err);
        setResponse(fullText + "\n\n⚠️ Translation failed.");
      }
    } else {
      setResponse(fullText);
    }

    setLoading(false);
  };

  const handleMic = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser doesn't support speech recognition.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speech = event.results[0][0].transcript;
      setPrompt(speech);
    };

    recognition.onerror = (e: any) => console.error("Mic error:", e);

    recognition.start();
    setRecording(true);
    recognition.onend = () => setRecording(false);
  };

  return (
    <div className="mt-12 p-6 border rounded-xl bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900 shadow-xl">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
        <Sparkles className="mr-2 text-emerald-500" />
        Ask the Local LLM (Ollama)
      </h3>
      <div className="flex gap-2 mb-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about AI models, quantization, memory..."
          className="flex-1"
        />
        <Button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </Button>
        <Button variant="ghost" onClick={handleMic} title="Voice Input">
          <Mic className={recording ? "animate-pulse text-red-500" : "text-gray-600"} />
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <select value={model} onChange={(e) => setModel(e.target.value)} className="px-2 py-1 rounded">
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-2 py-1 rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
        </select>
      </div>
      {response && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded shadow">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};
