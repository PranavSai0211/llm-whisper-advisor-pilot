
export interface Model {
  name: string;
  size: string;
  description: string;
}

export interface ModelCategory {
  [category: string]: Model[];
}

export interface ModelRecommendation {
  recommendation: string;
  performanceTier: string;
  additionalInfo: string;
  detailedModels: ModelCategory;
}

export interface PerformanceTier {
  name: string;
  ramRange: string;
  description: string;
  useCases: string[];
  examples: string[];
}

// Enhanced RAM extraction function
export const extractNumericRam = (ram: string | number): number | null => {
  if (typeof ram === 'number') return ram;
  if (!ram) return null;
  
  const ramStr = String(ram).toLowerCase().replace(/\s/g, '');
  
  // Handle various formats: "8GB", "8gb", "8192MB", etc.
  const gbMatch = ramStr.match(/(\d+(?:\.\d+)?)(?:gb|g)/);
  if (gbMatch) {
    return Math.round(parseFloat(gbMatch[1]));
  }
  
  // Handle MB format
  const mbMatch = ramStr.match(/(\d+)(?:mb|m)/);
  if (mbMatch) {
    return Math.max(1, Math.round(parseInt(mbMatch[1]) / 1024));
  }
  
  // Handle plain numbers (assume GB)
  const plainMatch = ramStr.match(/(\d+)/);
  if (plainMatch) {
    return parseInt(plainMatch[1]);
  }
  
  return null;
};

// Comprehensive model database with quantization support
export const LLM_DATABASE: { [key: string]: ModelCategory } = {
  ultra_low: {
    general: [
      { name: "TinyLlama-1.1B-Chat", size: "2.2GB", description: "Ultra-compact conversational model" },
      { name: "DistilBERT-base", size: "0.3GB", description: "Efficient BERT variant for NLP tasks" },
      { name: "all-MiniLM-L6-v2", size: "0.1GB", description: "Sentence embeddings specialist" },
      { name: "OPT-125M", size: "0.5GB", description: "Meta's lightweight language model" },
      { name: "GPT-Neo-125M", size: "0.5GB", description: "EleutherAI's compact model" },
      { name: "DistilGPT-2", size: "0.3GB", description: "Distilled version of GPT-2" },
      { name: "MobileBERT", size: "0.2GB", description: "Google's mobile-optimized BERT" },
      { name: "ALBERT-base", size: "0.4GB", description: "A Lite BERT for self-supervised learning" },
      { name: "RoBERTa-base", size: "0.5GB", description: "Robustly optimized BERT pretraining" },
      { name: "ELECTRA-small", size: "0.2GB", description: "Efficiently learning encoder representations" },
      { name: "MobileLLaMA-1B", size: "1.0GB", description: "Mobile-optimized Llama variant" },
      { name: "GPT-2-small", size: "0.5GB", description: "OpenAI's original small model" },
      { name: "T5-small", size: "0.2GB", description: "Text-to-Text Transfer Transformer" },
      { name: "FLAN-T5-small", size: "0.3GB", description: "Instruction-tuned T5" },
      { name: "UL2-small", size: "0.8GB", description: "Unified Language Learner" }
    ],
    code: [
      { name: "CodeT5-small", size: "0.3GB", description: "Compact code generation model" },
      { name: "Replit-code-v1-3B", size: "1.2GB", description: "Code completion specialist" },
      { name: "UnixCoder-base", size: "0.5GB", description: "Microsoft's code understanding model" },
      { name: "CodeBERT-base", size: "0.5GB", description: "Bimodal pre-trained model for programming" },
      { name: "GraphCodeBERT-base", size: "0.5GB", description: "Pre-trained model with data flow" },
      { name: "CodeT5-base", size: "0.9GB", description: "Identifier-aware unified pre-trained encoder-decoder" },
      { name: "PyCodeGPT-110M", size: "0.4GB", description: "Python code generation specialist" },
      { name: "CodeParrot-110M", size: "0.4GB", description: "GPT-2 model trained on Python code" }
    ],
    chat: [
      { name: "DialoGPT-small", size: "0.4GB", description: "Microsoft's chat model" },
      { name: "BlenderBot-small", size: "0.4GB", description: "Facebook's conversational AI" },
      { name: "PersonaChat-small", size: "0.3GB", description: "Personality-based chatbot" },
      { name: "ConvAI2-small", size: "0.3GB", description: "Conversational AI challenge winner" },
      { name: "Empathetic-small", size: "0.4GB", description: "Empathetic response generation" }
    ]
  },
  low: {
    general: [
      { name: "Phi-1.5", size: "2.8GB", description: "Microsoft's efficient reasoning model" },
      { name: "Gemma-2B", size: "1.4GB", description: "Google's compact foundation model" },
      { name: "OpenLLaMA-3B", size: "2.1GB", description: "Open source LLaMA reproduction" },
      { name: "RedPajama-3B", size: "2.0GB", description: "Together AI's open model" },
      { name: "StableLM-3B", size: "2.3GB", description: "Stability AI's language model" },
      { name: "Pythia-2.8B", size: "2.8GB", description: "EleutherAI's training suite model" },
      { name: "GPT-Neo-2.7B", size: "2.7GB", description: "EleutherAI's open GPT model" },
      { name: "OPT-2.7B", size: "2.7GB", description: "Meta's open pre-trained transformer" },
      { name: "BLOOM-3B", size: "3.0GB", description: "BigScience's multilingual model" },
      { name: "GPT-J-6B", size: "3.5GB", description: "EleutherAI's 6B parameter model" },
      { name: "Cerebras-GPT-2.7B", size: "2.7GB", description: "Cerebras Systems' open model" },
      { name: "PaLM-2B", size: "2.0GB", description: "Google's Pathways Language Model" },
      { name: "LaMDA-2B", size: "2.2GB", description: "Google's Language Model for Dialogue" },
      { name: "FairSeq-2.7B", size: "2.7GB", description: "Facebook's sequence-to-sequence toolkit" },
      { name: "Megatron-2.5B", size: "2.5GB", description: "NVIDIA's transformer model" },
      { name: "GLM-2B", size: "2.0GB", description: "General Language Model pretraining" },
      { name: "CPM-2", size: "2.6GB", description: "Chinese Pre-trained Language Model" },
      { name: "mT5-small", size: "1.2GB", description: "Multilingual Text-to-Text Transfer" },
      { name: "ByT5-small", size: "1.5GB", description: "Byte-level Text-to-Text Transfer" },
      { name: "Switch-2B", size: "2.0GB", description: "Switch Transformer sparse model" }
    ],
    code: [
      { name: "CodeGen-2B", size: "1.8GB", description: "Salesforce's code generation model" },
      { name: "StarCoder-1B", size: "1.1GB", description: "BigCode's programming assistant" },
      { name: "InCoder-1B", size: "1.0GB", description: "Facebook's code infilling model" },
      { name: "PolyCoder-2.7B", size: "2.7GB", description: "Carnegie Mellon's code model" },
      { name: "CodeParrot-small", size: "1.5GB", description: "HuggingFace's Python code model" },
      { name: "SantaCoder-1.1B", size: "1.1GB", description: "BigCode's multilingual code model" },
      { name: "GPT-Code-2B", size: "2.0GB", description: "Code-specialized GPT variant" },
      { name: "AlphaCode-2B", size: "2.2GB", description: "DeepMind's programming model" },
      { name: "Codex-2B", size: "2.0GB", description: "OpenAI's code generation model" },
      { name: "TabNine-2B", size: "2.1GB", description: "AI code completion assistant" }
    ],
    chat: [
      { name: "Alpaca-3B", size: "2.0GB", description: "Stanford's instruction-following model" },
      { name: "Vicuna-3B", size: "2.1GB", description: "UC Berkeley's chat model" },
      { name: "Dolly-3B", size: "2.2GB", description: "Databricks' instruction-tuned model" },
      { name: "OpenAssistant-3B", size: "2.3GB", description: "LAION's assistant model" },
      { name: "StableVicuna-3B", size: "2.1GB", description: "Stable version of Vicuna" },
      { name: "MPT-3B-Chat", size: "2.0GB", description: "MosaicML's chat variant" },
      { name: "RedPajama-Chat-3B", size: "2.1GB", description: "Together AI's chat model" },
      { name: "OpenChatKit-3B", size: "2.2GB", description: "Together AI's open chat model" },
      { name: "Koala-3B", size: "2.0GB", description: "UC Berkeley's dialogue model" },
      { name: "Guanaco-3B", size: "2.1GB", description: "QLoRA fine-tuned model" }
    ],
    multilingual: [
      { name: "mGPT-2.7B", size: "2.7GB", description: "Multilingual GPT model" },
      { name: "XLM-R-base", size: "2.0GB", description: "Cross-lingual language model" },
      { name: "mBERT-large", size: "1.8GB", description: "Multilingual BERT" },
      { name: "BLOOM-1B7", size: "1.7GB", description: "BigScience multilingual model" }
    ]
  },
  moderate_low: {
    general: [
      { name: "Phi-2", size: "5.2GB", description: "Microsoft's advanced 2.7B parameter model" },
      { name: "Gemma-7B", size: "4.2GB", description: "Google's efficient 7B model" },
      { name: "Mistral-7B-v0.1", size: "4.1GB", description: "Mistral AI's foundation model" },
      { name: "OpenLLaMA-7B", size: "4.0GB", description: "Open source 7B language model" },
      { name: "MPT-7B", size: "4.3GB", description: "MosaicML's transformer model" },
      { name: "Falcon-7B", size: "4.1GB", description: "TII's instruction model" },
      { name: "Pythia-6.9B", size: "6.9GB", description: "EleutherAI's large training model" },
      { name: "BLOOM-7B", size: "7.0GB", description: "BigScience's multilingual foundation model" },
      { name: "OLMo-7B", size: "4.2GB", description: "Allen AI's open language model" },
      { name: "Llama-7B", size: "4.0GB", description: "Meta's foundation model" },
      { name: "StableLM-7B", size: "4.1GB", description: "Stability AI's larger model" },
      { name: "RedPajama-7B", size: "4.0GB", description: "Together AI's 7B model" },
      { name: "OpenLLaMA-7B-v2", size: "4.1GB", description: "Improved OpenLLaMA version" },
      { name: "Vicuna-7B", size: "3.9GB", description: "UC Berkeley's 7B chat model" },
      { name: "Alpaca-7B", size: "3.8GB", description: "Stanford's instruction model" },
      { name: "GPT-NeoX-6B", size: "6.0GB", description: "EleutherAI's improved model" },
      { name: "OPT-6.7B", size: "6.7GB", description: "Meta's 6.7B parameter model" },
      { name: "T5-large", size: "3.0GB", description: "Large Text-to-Text Transfer" },
      { name: "FLAN-T5-large", size: "3.2GB", description: "Instruction-tuned T5 large" },
      { name: "UL2-base", size: "4.0GB", description: "Unified Language Learner base" }
    ],
    code: [
      { name: "CodeLlama-7B", size: "3.8GB", description: "Meta's specialized code model" },
      { name: "StarCoder-7B", size: "4.0GB", description: "Advanced code generation model" },
      { name: "SantaCoder-1.1B", size: "1.2GB", description: "Multilingual code model" },
      { name: "CodeGen-6B", size: "6.0GB", description: "Salesforce's larger code model" },
      { name: "CodeT5p-6B", size: "6.2GB", description: "Salesforce's code understanding model" },
      { name: "InCoder-6B", size: "6.0GB", description: "Facebook's large infilling model" },
      { name: "PolyCoder-6B", size: "6.1GB", description: "Carnegie Mellon's large code model" },
      { name: "AlphaCode-7B", size: "4.0GB", description: "DeepMind's competitive programming" },
      { name: "Codex-7B", size: "4.1GB", description: "OpenAI's advanced code model" },
      { name: "WizardCoder-7B", size: "4.0GB", description: "Microsoft's coding wizard" }
    ],
    chat: [
      { name: "Zephyr-7B-beta", size: "4.2GB", description: "HuggingFace's chat specialist" },
      { name: "Neural-Chat-7B", size: "4.1GB", description: "Intel's optimized chat model" },
      { name: "OpenChat-7B", size: "4.0GB", description: "High-quality conversation model" },
      { name: "Nous-Hermes-7B", size: "4.1GB", description: "NousResearch's assistant model" },
      { name: "StableBeluga-7B", size: "4.2GB", description: "Stability AI's chat model" },
      { name: "Llama-2-7B-Chat", size: "3.9GB", description: "Meta's chat-optimized model" },
      { name: "Vicuna-7B-v1.3", size: "3.9GB", description: "Improved Vicuna chat model" },
      { name: "WizardLM-7B", size: "4.0GB", description: "Microsoft's instruction model" },
      { name: "Orca-Mini-7B", size: "4.1GB", description: "Microsoft's reasoning model" },
      { name: "Samantha-7B", size: "4.0GB", description: "Eric Hartford's assistant model" }
    ],
    reasoning: [
      { name: "WizardMath-7B", size: "4.0GB", description: "Mathematical reasoning specialist" },
      { name: "MAmmoTH-7B", size: "4.1GB", description: "Mathematical reasoning model" },
      { name: "MetaMath-7B", size: "3.9GB", description: "Mathematical problem solver" },
      { name: "Abel-7B", size: "4.0GB", description: "Advanced reasoning capabilities" },
      { name: "Orca-2-7B", size: "4.1GB", description: "Microsoft's reasoning specialist" }
    ],
    multilingual: [
      { name: "BLOOM-7B1", size: "7.1GB", description: "BigScience multilingual 7B" },
      { name: "mGPT-7B", size: "4.2GB", description: "Multilingual GPT 7B" },
      { name: "Polyglot-Ko-7B", size: "4.0GB", description: "Korean language model" },
      { name: "Chinese-Alpaca-7B", size: "4.1GB", description: "Chinese instruction model" }
    ]
  },
  moderate: {
    general: [
      { name: "Llama-2-7B-Chat", size: "3.5GB", description: "Meta's popular chat model (4-bit)" },
      { name: "Mistral-7B-Instruct-v0.2", size: "4.1GB", description: "Latest Mistral instruction model" },
      { name: "Qwen-7B-Chat", size: "4.0GB", description: "Alibaba's multilingual model" },
      { name: "Baichuan2-7B-Chat", size: "4.1GB", description: "Chinese LLM with strong capabilities" },
      { name: "Yi-6B-Chat", size: "3.8GB", description: "01.AI's bilingual chat model" },
      { name: "InternLM-7B-Chat", size: "4.0GB", description: "Shanghai AI Lab's model" },
      { name: "ChatGLM3-6B", size: "3.7GB", description: "Tsinghua's latest chat model" },
      { name: "Aquila-7B", size: "4.1GB", description: "BAAI's Chinese-English model" },
      { name: "Skywork-13B", size: "7.2GB", description: "Kunlun's bilingual model" },
      { name: "Llama-2-7B", size: "3.8GB", description: "Meta's base foundation model" },
      { name: "Mistral-7B-v0.1", size: "4.0GB", description: "Original Mistral foundation" },
      { name: "Solar-10.7B", size: "5.4GB", description: "Upstage's efficient model" },
      { name: "Nous-Hermes-2-7B", size: "4.0GB", description: "NousResearch's improved model" },
      { name: "OpenHermes-2.5-7B", size: "4.1GB", description: "Teknium's assistant model" },
      { name: "Starling-LM-7B", size: "4.0GB", description: "Berkeley's RLAIF model" },
      { name: "Openchat-3.5-7B", size: "4.0GB", description: "OpenChat's latest version" },
      { name: "Dolphin-2.2.1-7B", size: "4.1GB", description: "Eric Hartford's uncensored model" },
      { name: "PlatYi-7B", size: "4.0GB", description: "01.AI's chat-optimized model" },
      { name: "TinyLlama-1.1B-Chat", size: "1.1GB", description: "Compact conversational model" },
      { name: "DeepSeek-LLM-7B", size: "4.2GB", description: "DeepSeek's language model" }
    ],
    code: [
      { name: "CodeLlama-7B-Instruct", size: "3.8GB", description: "Instruction-tuned code specialist" },
      { name: "WizardCoder-7B", size: "4.0GB", description: "Enhanced coding capabilities" },
      { name: "Phind-CodeLlama-7B-v2", size: "3.9GB", description: "Code search optimized model" },
      { name: "Magicoder-7B", size: "4.0GB", description: "OSS-Instruct trained code model" },
      { name: "DeepSeek-Coder-7B", size: "3.9GB", description: "DeepSeek's coding specialist" },
      { name: "WizardCoder-Python-7B", size: "4.0GB", description: "Python-specialized coding model" },
      { name: "StarCoder-7B", size: "4.0GB", description: "BigCode's 7B programming model" },
      { name: "CodeT5p-7B", size: "4.1GB", description: "Salesforce's code understanding" },
      { name: "InstructCodeT5p-7B", size: "4.2GB", description: "Instruction-tuned CodeT5p" },
      { name: "CodeGen2-7B", size: "4.0GB", description: "Salesforce's improved code model" },
      { name: "SantaCoder-7B", size: "4.1GB", description: "BigCode's multilingual coder" },
      { name: "Replit-Code-7B", size: "4.0GB", description: "Replit's code completion model" },
      { name: "Code-Alpaca-7B", size: "3.9GB", description: "Stanford's code instruction model" },
      { name: "UnixCoder-7B", size: "4.0GB", description: "Microsoft's large code model" }
    ],
    chat: [
      { name: "Vicuna-7B-v1.5", size: "3.9GB", description: "Enhanced conversational model" },
      { name: "ChatGLM2-6B", size: "3.7GB", description: "Tsinghua's bilingual chat model" },
      { name: "Baize-7B", size: "4.0GB", description: "Self-chat trained model" },
      { name: "OpenBuddy-7B", size: "4.0GB", description: "Cross-lingual AI assistant" },
      { name: "Koala-7B", size: "3.9GB", description: "UC Berkeley's dialogue model" },
      { name: "GPT4All-7B", size: "4.0GB", description: "Nomic AI's local chat model" },
      { name: "Wizard-Vicuna-7B", size: "4.1GB", description: "Combined instruction model" },
      { name: "Manticore-7B", size: "4.0GB", description: "Multi-domain chat model" },
      { name: "Airoboros-7B", size: "4.1GB", description: "Context-aware chat model" },
      { name: "Samantha-1.2-7B", size: "4.0GB", description: "Empathetic AI assistant" }
    ],
    reasoning: [
      { name: "MetaMath-7B", size: "3.9GB", description: "Mathematical problem solving" },
      { name: "Abel-7B", size: "4.0GB", description: "Advanced reasoning capabilities" },
      { name: "WizardMath-7B-V1.1", size: "4.0GB", description: "Enhanced math reasoning" },
      { name: "MAmmoTH-7B", size: "4.1GB", description: "Mathematical reasoning model" },
      { name: "Orca-2-7B", size: "4.2GB", description: "Microsoft's reasoning model" },
      { name: "OpenOrca-7B", size: "4.0GB", description: "Open-source Orca variant" }
    ],
    multilingual: [
      { name: "Qwen-7B", size: "4.0GB", description: "Alibaba's multilingual foundation" },
      { name: "Baichuan2-7B", size: "4.1GB", description: "Chinese-English bilingual" },
      { name: "InternLM-7B", size: "4.0GB", description: "Shanghai AI Lab multilingual" },
      { name: "Chinese-LLaMA-2-7B", size: "4.0GB", description: "Chinese-optimized Llama" },
      { name: "Vigogne-7B", size: "4.1GB", description: "French instruction model" }
    ]
  },
  good: {
    general: [
      { name: "Llama-2-13B-Chat", size: "7.3GB", description: "Larger Llama variant (4-bit)" },
      { name: "Vicuna-13B-v1.5", size: "7.2GB", description: "Enhanced large chat model" },
      { name: "OpenChat-3.5-13B", size: "7.1GB", description: "High-quality large chat model" },
      { name: "Qwen-14B-Chat", size: "7.8GB", description: "Alibaba's advanced model" },
      { name: "Baichuan2-13B-Chat", size: "7.5GB", description: "Large Chinese language model" },
      { name: "Yi-34B-Chat (8-bit)", size: "19.5GB", description: "01.AI's flagship model" },
      { name: "Nous-Hermes-13B", size: "7.3GB", description: "NousResearch's large assistant" },
      { name: "WizardLM-13B", size: "7.2GB", description: "Microsoft's instruction model" },
      { name: "Alpaca-13B", size: "7.0GB", description: "Stanford's large instruction model" },
      { name: "Llama-2-13B", size: "7.0GB", description: "Meta's 13B foundation model" },
      { name: "MPT-30B", size: "15.0GB", description: "MosaicML's large transformer" },
      { name: "Falcon-40B (8-bit)", size: "20.0GB", description: "TII's large instruction model" },
      { name: "Guanaco-13B", size: "7.1GB", description: "QLoRA fine-tuned model" },
      { name: "Orca-13B", size: "7.4GB", description: "Microsoft's reasoning model" },
      { name: "Platypus-13B", size: "7.2GB", description: "Fine-tuned Llama variant" },
      { name: "WizardLM-13B-V1.2", size: "7.3GB", description: "Improved WizardLM" },
      { name: "Nous-Hermes-2-13B", size: "7.4GB", description: "Enhanced Hermes model" },
      { name: "OpenOrca-13B", size: "7.2GB", description: "Open-source Orca recreation" },
      { name: "Airoboros-13B", size: "7.3GB", description: "Context-aware large model" },
      { name: "MythoMax-13B", size: "7.2GB", description: "Roleplay-optimized model" }
    ],
    code: [
      { name: "CodeLlama-13B-Instruct", size: "7.3GB", description: "Large code generation model" },
      { name: "WizardCoder-15B", size: "8.2GB", description: "Advanced coding assistant" },
      { name: "StarCoder-15B", size: "8.5GB", description: "Large programming model" },
      { name: "CodeT5p-16B", size: "8.8GB", description: "Salesforce's large code model" },
      { name: "Phind-CodeLlama-34B (8-bit)", size: "19.0GB", description: "Large code search model" },
      { name: "DeepSeek-Coder-33B (8-bit)", size: "18.5GB", description: "Large coding specialist" },
      { name: "CodeLlama-13B-Python", size: "7.4GB", description: "Python-specialized CodeLlama" },
      { name: "WizardCoder-Python-13B", size: "7.3GB", description: "Python coding wizard" },
      { name: "InstructCodeT5p-16B", size: "8.9GB", description: "Large instruction code model" },
      { name: "CodeGen2-16B", size: "8.7GB", description: "Salesforce's large code model" }
    ],
    chat: [
      { name: "ChatGLM2-12B", size: "6.8GB", description: "Large bilingual chat model" },
      { name: "Alpaca-13B", size: "7.0GB", description: "Large instruction-following model" },
      { name: "StableBeluga-13B", size: "7.2GB", description: "Stability AI's large chat model" },
      { name: "Guanaco-13B", size: "7.1GB", description: "QLoRA fine-tuned model" },
      { name: "Vicuna-13B-v1.3", size: "7.1GB", description: "Improved Vicuna chat" },
      { name: "WizardLM-13B", size: "7.2GB", description: "Microsoft's large wizard" },
      { name: "Manticore-13B", size: "7.3GB", description: "Multi-domain large chat" },
      { name: "Airoboros-L2-13B", size: "7.2GB", description: "Llama-2 based chat model" },
      { name: "Chronos-13B", size: "7.3GB", description: "Time-aware chat model" },
      { name: "Huginn-13B", size: "7.2GB", description: "Norse mythology themed model" }
    ],
    multimodal: [
      { name: "LLaVA-13B", size: "7.5GB", description: "Large vision-language model" },
      { name: "MiniGPT-4-13B", size: "7.2GB", description: "Multimodal conversational AI" },
      { name: "InstructBLIP-13B", size: "7.8GB", description: "Vision-language instruction model" },
      { name: "BLIP-2-FlanT5-XL", size: "4.8GB", description: "Salesforce's vision-language model" },
      { name: "Flamingo-9B", size: "9.0GB", description: "DeepMind's few-shot learning model" },
      { name: "LLaVA-1.5-13B", size: "7.6GB", description: "Improved LLaVA model" },
      { name: "Otter-13B", size: "7.4GB", description: "Multi-modal instruction tuned" },
      { name: "mPLUG-Owl-14B", size: "8.0GB", description: "Alibaba's multimodal model" },
      { name: "InternLM-XComposer-7B", size: "7.0GB", description: "Vision-language composition" },
      { name: "Qwen-VL-7B", size: "7.2GB", description: "Qwen vision-language model" }
    ],
    reasoning: [
      { name: "WizardMath-13B", size: "7.3GB", description: "Advanced mathematical reasoning" },
      { name: "Orca-2-13B", size: "7.4GB", description: "Microsoft's reasoning specialist" },
      { name: "MetaMath-13B", size: "7.2GB", description: "Mathematical problem solver" },
      { name: "MAmmoTH-13B", size: "7.3GB", description: "Large mathematical reasoning model" },
      { name: "Abel-13B", size: "7.4GB", description: "Advanced reasoning capabilities" },
      { name: "Goat-13B", size: "7.2GB", description: "Arithmetic reasoning specialist" },
      { name: "OpenOrca-Platypus-13B", size: "7.3GB", description: "Combined reasoning model" }
    ],
    multilingual: [
      { name: "Qwen-14B", size: "7.8GB", description: "Alibaba's large multilingual" },
      { name: "Baichuan2-13B", size: "7.5GB", description: "Large Chinese-English model" },
      { name: "InternLM-20B", size: "11.0GB", description: "Shanghai AI Lab's large model" },
      { name: "Chinese-Alpaca-Plus-13B", size: "7.4GB", description: "Enhanced Chinese model" },
      { name: "Polyglot-Ko-13B", size: "7.3GB", description: "Large Korean model" }
    ]
  },
  high: {
    general: [
      { name: "Mixtral-8x7B-Instruct-v0.1", size: "26.9GB", description: "Mixture of experts model (4-bit)" },
      { name: "Llama-2-70B-Chat (8-bit)", size: "38.0GB", description: "Large language model" },
      { name: "Yi-34B-Chat", size: "19.5GB", description: "01.AI's flagship model" },
      { name: "Qwen-72B (4-bit)", size: "36.0GB", description: "Alibaba's largest model" },
      { name: "DeepSeek-67B", size: "35.0GB", description: "Advanced reasoning model" },
      { name: "Nous-Hermes-2-Mixtral-8x7B", size: "26.9GB", description: "NousResearch's MoE model" },
      { name: "Solar-10.7B", size: "10.7GB", description: "Upstage's efficient model" },
      { name: "Dolphin-2.5-Mixtral-8x7B", size: "26.9GB", description: "Uncensored Mixtral variant" },
      { name: "Llama-2-70B", size: "35.0GB", description: "Meta's flagship model (8-bit)" },
      { name: "Falcon-40B", size: "20.0GB", description: "TII's large model" },
      { name: "MPT-30B", size: "15.0GB", description: "MosaicML's 30B model" },
      { name: "Nous-Hermes-2-Yi-34B", size: "19.6GB", description: "Enhanced Yi model" },
      { name: "OpenHermes-2.5-Mistral-7B", size: "4.1GB", description: "Teknium's Mistral variant" },
      { name: "Starling-LM-7B-alpha", size: "4.2GB", description: "Berkeley's RLAIF model" },
      { name: "NeuralBeagle-14B", size: "8.0GB", description: "MLP KAT merged model" },
      { name: "Goliath-120B (4-bit)", size: "60.0GB", description: "Large merged model" },
      { name: "Xwin-LM-70B (8-bit)", size: "38.5GB", description: "Xwin team's large model" },
      { name: "Airoboros-L2-70B (8-bit)", size: "38.0GB", description: "Large context model" }
    ],
    code: [
      { name: "CodeLlama-34B-Instruct", size: "19.0GB", description: "Large specialized coder" },
      { name: "DeepSeek-Coder-33B", size: "18.5GB", description: "Advanced code generation" },
      { name: "WizardCoder-34B", size: "19.2GB", description: "Enterprise-grade coding" },
      { name: "StarCoder2-15B", size: "8.5GB", description: "Next-gen programming model" },
      { name: "Phind-CodeLlama-34B", size: "19.0GB", description: "Code search specialized model" },
      { name: "Magicoder-34B", size: "19.1GB", description: "Large OSS-Instruct model" },
      { name: "CodeLlama-34B-Python", size: "19.1GB", description: "Python-specialized large model" },
      { name: "WizardCoder-Python-34B", size: "19.2GB", description: "Large Python specialist" },
      { name: "StarCoder-15.5B", size: "8.8GB", description: "Enhanced StarCoder" },
      { name: "Code-Alpaca-34B", size: "18.9GB", description: "Large code instruction model" }
    ],
    chat: [
      { name: "Vicuna-33B", size: "18.5GB", description: "Large conversational model" },
      { name: "Guanaco-65B (4-bit)", size: "33.0GB", description: "Large instruction-tuned model" },
      { name: "Alpaca-30B", size: "18.0GB", description: "Large Stanford model" },
      { name: "OpenBuddy-34B", size: "19.0GB", description: "Large cross-lingual assistant" },
      { name: "WizardLM-30B", size: "17.0GB", description: "Large instruction model" },
      { name: "Nous-Hermes-Llama2-70B (8-bit)", size: "38.2GB", description: "Large Hermes variant" },
      { name: "Airoboros-65B (4-bit)", size: "33.5GB", description: "Large context chat model" },
      { name: "MythoMax-L2-13B", size: "7.4GB", description: "Roleplay optimized" }
    ],
    reasoning: [
      { name: "WizardMath-70B (8-bit)", size: "38.5GB", description: "Premier math reasoning" },
      { name: "MetaMath-70B (8-bit)", size: "38.0GB", description: "Advanced mathematical AI" },
      { name: "Goat-70B (8-bit)", size: "35.0GB", description: "Arithmetic reasoning specialist" },
      { name: "MAmmoTH-70B (8-bit)", size: "38.2GB", description: "Large mathematical model" },
      { name: "Orca-2-13B", size: "7.4GB", description: "Microsoft's reasoning model" },
      { name: "Abel-70B (8-bit)", size: "38.1GB", description: "Large reasoning model" }
    ],
    multimodal: [
      { name: "LLaVA-34B", size: "19.0GB", description: "Large vision-language model" },
      { name: "CogVLM-17B", size: "17.0GB", description: "Tsinghua's vision-language model" },
      { name: "Qwen-VL-Chat", size: "9.6GB", description: "Alibaba's multimodal chat model" },
      { name: "LLaVA-1.5-34B", size: "19.2GB", description: "Enhanced large multimodal" },
      { name: "InstructBLIP-FlanT5-XXL", size: "12.0GB", description: "Large vision instruction" },
      { name: "BLIP-2-OPT-6.7B", size: "7.0GB", description: "Vision-language with OPT" }
    ],
    multilingual: [
      { name: "Qwen-72B", size: "36.0GB", description: "Alibaba's flagship multilingual" },
      { name: "Yi-34B-200K", size: "19.7GB", description: "Long context Yi model" },
      { name: "Baichuan2-53B", size: "27.0GB", description: "Large Chinese model" },
      { name: "InternLM-20B", size: "11.0GB", description: "Shanghai AI's large model" }
    ]
  },
  ultra_high: {
    general: [
      { name: "Llama-2-70B", size: "130GB", description: "Full precision flagship model" },
      { name: "Mixtral-8x22B", size: "176GB", description: "Largest mixture of experts" },
      { name: "Qwen-72B", size: "145GB", description: "Alibaba's full-precision model" },
      { name: "Falcon-180B (8-bit)", size: "90GB", description: "TII's massive model" },
      { name: "PaLM-2-340B (4-bit)", size: "85GB", description: "Google's large model" },
      { name: "BLOOM-176B (8-bit)", size: "88GB", description: "BigScience's largest model" },
      { name: "OPT-175B (8-bit)", size: "87GB", description: "Meta's largest open model" },
      { name: "GPT-NeoX-20B", size: "40GB", description: "EleutherAI's large model" },
      { name: "Jurassic-1-Jumbo", size: "178GB", description: "AI21's massive model" },
      { name: "MT-NLG-530B (4-bit)", size: "132GB", description: "Microsoft-NVIDIA model" },
      { name: "Switch-Transformer-1.6T (4-bit)", size: "400GB", description: "Google's sparse model" },
      { name: "GLaM-64B", size: "128GB", description: "Google's mixture of experts" },
      { name: "PaLM-540B (4-bit)", size: "135GB", description: "Google's pathways model" },
      { name: "Chinchilla-70B", size: "140GB", description: "DeepMind's compute-optimal" },
      { name: "Gopher-280B (4-bit)", size: "70GB", description: "DeepMind's large model" },
      { name: "Megatron-Turing-530B (4-bit)", size: "132GB", description: "NVIDIA-Microsoft collaboration" }
    ],
    code: [
      { name: "CodeLlama-34B", size: "68GB", description: "Full precision code model" },
      { name: "DeepSeek-Coder-33B", size: "66GB", description: "Full precision coding AI" },
      { name: "StarCoder-15B", size: "30GB", description: "Full precision programming" },
      { name: "WizardCoder-34B", size: "68GB", description: "Full precision coding specialist" },
      { name: "Code-Davinci-002", size: "175GB", description: "OpenAI's coding model (hypothetical)" },
      { name: "Codex-175B (8-bit)", size: "87GB", description: "Large code generation" },
      { name: "AlphaCode-41B", size: "82GB", description: "DeepMind's competitive programming" },
      { name: "PolyCoder-160B (8-bit)", size: "80GB", description: "Large multilingual coder" },
      { name: "InCoder-175B (8-bit)", size: "87GB", description: "Large code infilling" },
      { name: "CodeGen-16B", size: "32GB", description: "Large Salesforce model" }
    ],
    reasoning: [
      { name: "WizardMath-70B", size: "130GB", description: "Full precision mathematics" },
      { name: "Goat-70B", size: "132GB", description: "Full precision arithmetic" },
      { name: "MetaMath-70B", size: "130GB", description: "Premier reasoning model" },
      { name: "Orca-2-70B", size: "131GB", description: "Microsoft's large reasoning model" },
      { name: "MAmmoTH-70B", size: "130GB", description: "Large mathematical specialist" },
      { name: "Minerva-540B (4-bit)", size: "135GB", description: "Google's math specialist" },
      { name: "Galactica-120B", size: "240GB", description: "Meta's scientific model" },
      { name: "PaLM-2-Unicorn", size: "340GB", description: "Google's reasoning flagship" }
    ],
    multimodal: [
      { name: "Flamingo-80B", size: "160GB", description: "Large multimodal model" },
      { name: "BLIP-2-FlanT5-XXL", size: "45GB", description: "Vision-language specialist" },
      { name: "LLaVA-NeXT-34B", size: "68GB", description: "Next-gen vision-language model" },
      { name: "InstructBLIP-FlanT5-XXL", size: "48GB", description: "Large instruction multimodal" },
      { name: "CogVLM-34B", size: "68GB", description: "Large vision-language understanding" },
      { name: "Qwen-VL-Max", size: "72GB", description: "Alibaba's largest multimodal" },
      { name: "GPT-4V (hypothetical)", size: "200GB", description: "OpenAI's vision model" },
      { name: "Flamingo-Chinchilla-70B", size: "140GB", description: "DeepMind's multimodal" },
      { name: "KOSMOS-2-175B (8-bit)", size: "87GB", description: "Microsoft's multimodal" },
      { name: "Bard-Gemini-Ultra", size: "175GB", description: "Google's multimodal flagship" }
    ],
    multilingual: [
      { name: "BLOOM-176B", size: "352GB", description: "BigScience's multilingual flagship" },
      { name: "mT5-XXL", size: "52GB", description: "Multilingual T5 extra large" },
      { name: "XLM-R-XXL", size: "48GB", description: "Cross-lingual representation" },
      { name: "mGPT-175B (8-bit)", size: "87GB", description: "Multilingual GPT large" },
      { name: "PaLM-2-Bison", size: "62GB", description: "Google's multilingual model" },
      { name: "Polyglot-Ko-30B", size: "60GB", description: "Large Korean model" }
    ],
    specialized: [
      { name: "Galactica-120B", size: "240GB", description: "Scientific knowledge model" },
      { name: "Med-PaLM-540B (4-bit)", size: "135GB", description: "Medical specialist model" },
      { name: "LegalBERT-175B (8-bit)", size: "87GB", description: "Legal domain specialist" },
      { name: "FinBERT-175B (8-bit)", size: "87GB", description: "Financial domain model" },
      { name: "BioBERT-175B (8-bit)", size: "87GB", description: "Biomedical specialist" },
      { name: "SciBERT-175B (8-bit)", size: "87GB", description: "Scientific literature model" }
    ]
  }
};

// Performance tier definitions
export const PERFORMANCE_TIERS: { [key: string]: PerformanceTier } = {
  ultra_low: {
    name: "Ultra Low",
    ramRange: "≤2GB",
    description: "Mobile-optimized, basic NLP tasks",
    useCases: ["Simple text processing", "Embeddings", "Classification"],
    examples: ["TinyLlama", "DistilBERT", "MiniLM"]
  },
  low: {
    name: "Low",
    ramRange: "3-4GB",
    description: "Entry-level chat and coding assistance",
    useCases: ["Basic conversations", "Simple coding", "Text generation"],
    examples: ["Phi-1.5", "Gemma-2B", "CodeGen-2B"]
  },
  moderate_low: {
    name: "Moderate-Low",
    ramRange: "5-6GB",
    description: "Solid performance for most tasks",
    useCases: ["Good conversations", "Code assistance", "Content creation"],
    examples: ["Phi-2", "Mistral-7B", "CodeLlama-7B"]
  },
  moderate: {
    name: "Moderate",
    ramRange: "7-8GB",
    description: "Professional-grade capabilities",
    useCases: ["Complex reasoning", "Advanced coding", "Research tasks"],
    examples: ["Llama-2-7B", "Zephyr-7B", "WizardCoder-7B"]
  },
  good: {
    name: "Good",
    ramRange: "9-16GB",
    description: "High-quality performance",
    useCases: ["Advanced reasoning", "Multimodal tasks", "Professional work"],
    examples: ["Llama-2-13B", "LLaVA-13B", "Orca-2-13B"]
  },
  high: {
    name: "High",
    ramRange: "17-32GB",
    description: "Enterprise-grade performance",
    useCases: ["Complex reasoning", "Large contexts", "Specialized tasks"],
    examples: ["Mixtral-8x7B", "Yi-34B", "CodeLlama-34B"]
  },
  ultra_high: {
    name: "Ultra High",
    ramRange: ">32GB",
    description: "Research-grade capabilities",
    useCases: ["Cutting-edge research", "Maximum performance", "Fine-tuning"],
    examples: ["Llama-2-70B", "Mixtral-8x22B", "Falcon-180B"]
  }
};

// Enhanced model recommendation function
export const getModelRecommendations = (ramStr: string | number): ModelRecommendation => {
  const ram = extractNumericRam(ramStr);
  
  if (ram === null || ram === undefined) {
    return {
      recommendation: "⚪ Please specify your RAM amount for personalized recommendations",
      performanceTier: "Unknown",
      additionalInfo: "Enter RAM specifications to see compatible models",
      detailedModels: {}
    };
  }

  let tierKey: string;
  let tier: PerformanceTier;

  if (ram <= 2) {
    tierKey = 'ultra_low';
  } else if (ram <= 4) {
    tierKey = 'low';
  } else if (ram <= 6) {
    tierKey = 'moderate_low';
  } else if (ram <= 8) {
    tierKey = 'moderate';
  } else if (ram <= 16) {
    tierKey = 'good';
  } else if (ram <= 32) {
    tierKey = 'high';
  } else {
    tierKey = 'ultra_high';
  }

  tier = PERFORMANCE_TIERS[tierKey];
  const models = LLM_DATABASE[tierKey] || {};

  // Generate recommendation message with emoji
  const emoji = ram <= 2 ? '🔸' : ram <= 8 ? '🟠' : ram <= 16 ? '🟢' : '🔵';
  const recommendation = `${emoji} ${tier.description} - Perfect for ${tier.useCases.slice(0, 2).join(' and ')}`;

  return {
    recommendation,
    performanceTier: tier.name,
    additionalInfo: `Optimal for ${tier.useCases.join(', ')}. Recommended models include ${tier.examples.slice(0, 3).join(', ')}.`,
    detailedModels: models
  };
};

// Quantization calculations
export const calculateQuantizedSize = (originalSize: string, format: string): string => {
  const sizeMatch = originalSize.match(/(\d+\.?\d*)(GB|MB)/);
  if (!sizeMatch) return originalSize;
  
  const value = parseFloat(sizeMatch[1]);
  const unit = sizeMatch[2];
  
  const reductions: { [key: string]: number } = {
    'fp16': 1,
    'fp8': 0.5,
    'int8': 0.5,
    'int4': 0.25,
    'int2': 0.125
  };
  
  const reduction = reductions[format] || 1;
  const newValue = value * reduction;
  
  return `${newValue < 1 && unit === 'GB' ? (newValue * 1024).toFixed(0) + 'MB' : newValue.toFixed(1) + unit}`;
};
