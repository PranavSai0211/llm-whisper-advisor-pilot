
# 🤖 LLM Whisper Advisor

A multilingual AI assistant web app built with **Vite + React + TypeScript** that provides compatibility suggestions for Large Language Models (LLMs) based on your system's hardware (especially RAM). It uses local models via **Ollama** or external APIs like **Google AI**, and supports multilingual interaction (English, Hindi, Telugu).

🌐 [Live App](https://88fqf5q3-8080.inc1.devtunnels.ms/)

---

## ✨ Features

- 🔀 **Model Switching** – Choose from various LLMs (LLaMA3, Mistral, Gemma, etc.)
- 💬 **Streamed AI Responses** – Fast & real-time chatbot experience
- 🌍 **Multilingual Output** – English, हिंदी, తెలుగు
- 🎙️ **Voice Input** (Speech-to-Text) for user queries
- 📊 **RAM-Based LLM Suggestions** – Suggests best LLMs based on available system memory
- 💾 **Quantization & Model Details** – Gives metadata like context length, model size, use-case
- 📥 **Local or Cloud Inference** – Use Ollama locally or deploy inference backend online
- 📁 **Dynamic CSV/Excel Support** – Uses structured model data for smart recommendations

---

## 🛠️ Tech Stack

| Tool         | Description                       |
|--------------|-----------------------------------|
| Vite         | Fast build tool                   |
| React + TS   | Frontend UI with type safety      |
| Tailwind CSS | Styling                           |
| shadcn/ui    | UI components                     |
| i18next      | Internationalization support      |
| Ollama       | Local LLM inference engine        |
| Google AI    | Optional cloud-based LLM support  |

---

## 📦 Installation & Setup

> **Requirements**: Node.js (18+), npm, Ollama (if using local models)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/llm-whisper-advisor.git
cd llm-whisper-advisor-pilot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file (example):

```env
VITE_OLLAMA_HOST=http://localhost:11434
VITE_SUPPORTED_LANGUAGES=en,hi,te
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 🧠 How It Works

1. **User enters RAM capacity**
2. **App suggests compatible models** using structured data (`model_data.csv` or Excel)
3. **Assistant can chat** using selected model (via Ollama API or external backend)
4. **Supports translation and voice input** for multilingual users

---

## 📤 Deployment (Vercel + Ollama Backend)

### Option 1: Local Use Only
Run Ollama and the frontend locally.

### Option 2: Public Use
Deploy frontend on Vercel and host Ollama on a cloud server (e.g., EC2) at a public IP.
- Update `.env` with public Ollama URL
- Make sure ports are open (`11434`)

---

## 🌍 Multilingual Support

- Built-in support for:
  - English (`en`)
  - Hindi (`hi`)
  - Telugu (`te`)
- Add more via `i18n.ts` config

---

## 📁 Folder Structure

```
llm-whisper-advisor-pilot/
├── public/               # Static assets
├── src/
│   ├── components/       # UI components
│   ├── contexts/         # Language context
│   ├── data/             # Model CSV or Excel data
│   ├── pages/            # Main pages
│   └── utils/            # Helper functions
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🤖 Models Supported

- 🧠 **LLaMA 2 / 3** (Meta)
- 🧠 **Mistral 7B / Mixtral**
- 🧠 **Gemma (Google)**
- 🧠 **Phi-2 / Phi-3**
- 🧠 **Zephyr, Dolphin, WizardLM**
- 🧠 **CodeLlama / DeepSeek-Coder**
- ...and more (70B quantized models too!)

---

## 🧪 Development Scripts

```bash
npm run dev        # Run development server
npm run build      # Create production build
npm run preview    # Preview production build
npm run lint       # Lint code with ESLint
```

---

## 📖 License

MIT © 2025 [Your Name or Org]

---

## 🙋‍♂️ Contributions

Pull requests welcome! Please open an issue first for major changes.
