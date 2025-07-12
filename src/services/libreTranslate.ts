export const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    if (!res.ok) {
      console.error("Translation request failed:", res.status, res.statusText);
      return text + "\n\n⚠️ Translation failed (network or unsupported language).";
    }

    const data = await res.json();

    if (!data.translatedText) {
      console.error("No translatedText in response:", data);
      return text + "\n\n⚠️ Translation response malformed.";
    }

    return data.translatedText;
  } catch (err) {
    console.error("Translation error:", err);
    return text + "\n\n⚠️ Translation error occurred.";
  }
};
