# Welcome 

## Project info

**URL**: [llmwhisper-five.vercel.app](https://llmwhisper-five.vercel.app/)


## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
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
