export const askOllama = async (prompt: string): Promise<string> => {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3", // <-- use your running model
      prompt,
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Ollama error:", err);
    throw new Error(err.error?.message || "Ollama request failed");
  }

  const data = await res.json();
  return data.response;
};

