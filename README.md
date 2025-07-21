# 🚀🌟 ModelMancer ✨🤖

A sleek AI-powered model recommendation assistant based on your device's RAM 💡  
Live app: 👉 [https://modelmate-xi.vercel.app/](https://modelmate-xi.vercel.app/)

---

## 🔧 Getting Started

You can easily edit the app in your favorite development environment.

### 🛠️ Local Setup

> ⚠️ Requires Node.js & npm.  
> Recommended: Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Run the app locally
npm run dev
```

🌐 Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Features at a Glance

✅ **RAM-based model suggestions** using structured CSV/Excel data  
✅ **Ollama-powered AI assistant** with interactive chat  
✅ **Voice input + translation** for multilingual interaction  
✅ **Multilingual UI:** English, हिंदी, తెలుగు  
✅ **Runs on Vercel** for instant access

---

## 🌐 Multilingual Support

| Language | Code |
|----------|------|
| 🇬🇧 English | `en` |
| 🇮🇳 Hindi   | `hi` |
| 🇮🇳 Telugu  | `te` |

🛠 Add more languages via `i18n.ts`

---

## 🗂️ Project Structure

```
llm-whisper-advisor-pilot/
├── public/               # Static assets (icons, images)
├── src/
│   ├── components/       # UI components (chat UI, buttons)
│   ├── contexts/         # Language and theme context
│   ├── data/             # Model data (CSV/Excel)
│   ├── pages/            # Page-level views
│   └── utils/            # Utility functions
├── package.json          # Dependencies
├── vite.config.ts        # Vite config
└── tailwind.config.ts    # Tailwind theme
```

---

## 🤖 Supported Models

✨ Includes support for top open-source LLMs:

- 🧠 LLaMA 2 & 3 (Meta)
- ⚡ Mistral 7B / Mixtral
- 🔎 Google Gemma
- 📘 Phi-2 / Phi-3 (Microsoft)
- 🧙 WizardLM, Zephyr, Dolphin
- 💻 CodeLlama / DeepSeek-Coder
- 🔢 Quantized 70B models (8-bit)

> All models are mapped against RAM profiles (ultra low → ultra high)

---

## 📦 NPM Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production
npm run lint       # Lint with ESLint
```

---

## 🤝 Contributing

Contributions are welcome!

- 🔧 Fork the repo
- 📥 Submit a pull request
- 🐛 Open issues for bugs/features

> Please open an issue first for large changes.

---

💡 *Built with ❤️ using Vite + React + Tailwind + Ollama*
