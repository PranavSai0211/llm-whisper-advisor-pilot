
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
      { name: "MobileBERT", size: "0.2GB", description: "Google's mobile-optimized BERT" }
    ],
    code: [
      { name: "CodeT5-small", size: "0.3GB", description: "Compact code generation model" },
      { name: "Replit-code-v1-3B", size: "1.2GB", description: "Code completion specialist" },
      { name: "UnixCoder-base", size: "0.5GB", description: "Microsoft's code understanding model" }
    ],
    chat: [
      { name: "DialoGPT-small", size: "0.4GB", description: "Microsoft's chat model" },
      { name: "BlenderBot-small", size: "0.4GB", description: "Facebook's conversational AI" }
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
      { name: "BLOOM-3B", size: "3.0GB", description: "BigScience's multilingual model" }
    ],
    code: [
      { name: "CodeGen-2B", size: "1.8GB", description: "Salesforce's code generation model" },
      { name: "StarCoder-1B", size: "1.1GB", description: "BigCode's programming assistant" },
      { name: "InCoder-1B", size: "1.0GB", description: "Facebook's code infilling model" },
      { name: "PolyCoder-2.7B", size: "2.7GB", description: "Carnegie Mellon's code model" },
      { name: "CodeParrot-small", size: "1.5GB", description: "HuggingFace's Python code model" }
    ],
    chat: [
      { name: "Alpaca-3B", size: "2.0GB", description: "Stanford's instruction-following model" },
      { name: "Vicuna-3B", size: "2.1GB", description: "UC Berkeley's chat model" },
      { name: "Dolly-3B", size: "2.2GB", description: "Databricks' instruction-tuned model" },
      { name: "OpenAssistant-3B", size: "2.3GB", description: "LAION's assistant model" },
      { name: "StableVicuna-3B", size: "2.1GB", description: "Stable version of Vicuna" }
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
      { name: "OLMo-7B", size: "4.2GB", description: "Allen AI's open language model" }
    ],
    code: [
      { name: "CodeLlama-7B", size: "3.8GB", description: "Meta's specialized code model" },
      { name: "StarCoder-7B", size: "4.0GB", description: "Advanced code generation model" },
      { name: "SantaCoder-1.1B", size: "1.2GB", description: "Multilingual code model" },
      { name: "CodeGen-6B", size: "6.0GB", description: "Salesforce's larger code model" },
      { name: "CodeT5p-6B", size: "6.2GB", description: "Salesforce's code understanding model" }
    ],
    chat: [
      { name: "Zephyr-7B-beta", size: "4.2GB", description: "HuggingFace's chat specialist" },
      { name: "Neural-Chat-7B", size: "4.1GB", description: "Intel's optimized chat model" },
      { name: "OpenChat-7B", size: "4.0GB", description: "High-quality conversation model" },
      { name: "Nous-Hermes-7B", size: "4.1GB", description: "NousResearch's assistant model" },
      { name: "StableBeluga-7B", size: "4.2GB", description: "Stability AI's chat model" }
    ],
    reasoning: [
      { name: "WizardMath-7B", size: "4.0GB", description: "Mathematical reasoning specialist" },
      { name: "MAmmoTH-7B", size: "4.1GB", description: "Mathematical reasoning model" }
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
      { name: "Skywork-13B", size: "7.2GB", description: "Kunlun's bilingual model" }
    ],
    code: [
      { name: "CodeLlama-7B-Instruct", size: "3.8GB", description: "Instruction-tuned code specialist" },
      { name: "WizardCoder-7B", size: "4.0GB", description: "Enhanced coding capabilities" },
      { name: "Phind-CodeLlama-7B-v2", size: "3.9GB", description: "Code search optimized model" },
      { name: "Magicoder-7B", size: "4.0GB", description: "OSS-Instruct trained code model" },
      { name: "DeepSeek-Coder-7B", size: "3.9GB", description: "DeepSeek's coding specialist" },
      { name: "WizardCoder-Python-7B", size: "4.0GB", description: "Python-specialized coding model" }
    ],
    chat: [
      { name: "Vicuna-7B-v1.5", size: "3.9GB", description: "Enhanced conversational model" },
      { name: "ChatGLM2-6B", size: "3.7GB", description: "Tsinghua's bilingual chat model" },
      { name: "Baize-7B", size: "4.0GB", description: "Self-chat trained model" },
      { name: "OpenBuddy-7B", size: "4.0GB", description: "Cross-lingual AI assistant" },
      { name: "Koala-7B", size: "3.9GB", description: "UC Berkeley's dialogue model" }
    ],
    reasoning: [
      { name: "MetaMath-7B", size: "3.9GB", description: "Mathematical problem solving" },
      { name: "Abel-7B", size: "4.0GB", description: "Advanced reasoning capabilities" },
      { name: "WizardMath-7B-V1.1", size: "4.0GB", description: "Enhanced math reasoning" }
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
      { name: "Alpaca-13B", size: "7.0GB", description: "Stanford's large instruction model" }
    ],
    code: [
      { name: "CodeLlama-13B-Instruct", size: "7.3GB", description: "Large code generation model" },
      { name: "WizardCoder-15B", size: "8.2GB", description: "Advanced coding assistant" },
      { name: "StarCoder-15B", size: "8.5GB", description: "Large programming model" },
      { name: "CodeT5p-16B", size: "8.8GB", description: "Salesforce's large code model" },
      { name: "Phind-CodeLlama-34B (8-bit)", size: "19.0GB", description: "Large code search model" },
      { name: "DeepSeek-Coder-33B (8-bit)", size: "18.5GB", description: "Large coding specialist" }
    ],
    chat: [
      { name: "ChatGLM2-12B", size: "6.8GB", description: "Large bilingual chat model" },
      { name: "Alpaca-13B", size: "7.0GB", description: "Large instruction-following model" },
      { name: "StableBeluga-13B", size: "7.2GB", description: "Stability AI's large chat model" },
      { name: "Guanaco-13B", size: "7.1GB", description: "QLoRA fine-tuned model" }
    ],
    multimodal: [
      { name: "LLaVA-13B", size: "7.5GB", description: "Large vision-language model" },
      { name: "MiniGPT-4-13B", size: "7.2GB", description: "Multimodal conversational AI" },
      { name: "InstructBLIP-13B", size: "7.8GB", description: "Vision-language instruction model" },
      { name: "BLIP-2-FlanT5-XL", size: "4.8GB", description: "Salesforce's vision-language model" },
      { name: "Flamingo-9B", size: "9.0GB", description: "DeepMind's few-shot learning model" }
    ],
    reasoning: [
      { name: "WizardMath-13B", size: "7.3GB", description: "Advanced mathematical reasoning" },
      { name: "Orca-2-13B", size: "7.4GB", description: "Microsoft's reasoning specialist" },
      { name: "MetaMath-13B", size: "7.2GB", description: "Mathematical problem solver" },
      { name: "MAmmoTH-13B", size: "7.3GB", description: "Large mathematical reasoning model" }
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
      { name: "Dolphin-2.5-Mixtral-8x7B", size: "26.9GB", description: "Uncensored Mixtral variant" }
    ],
    code: [
      { name: "CodeLlama-34B-Instruct", size: "19.0GB", description: "Large specialized coder" },
      { name: "DeepSeek-Coder-33B", size: "18.5GB", description: "Advanced code generation" },
      { name: "WizardCoder-34B", size: "19.2GB", description: "Enterprise-grade coding" },
      { name: "StarCoder2-15B", size: "8.5GB", description: "Next-gen programming model" },
      { name: "Phind-CodeLlama-34B", size: "19.0GB", description: "Code search specialized model" },
      { name: "Magicoder-34B", size: "19.1GB", description: "Large OSS-Instruct model" }
    ],
    chat: [
      { name: "Vicuna-33B", size: "18.5GB", description: "Large conversational model" },
      { name: "Guanaco-65B (4-bit)", size: "33.0GB", description: "Large instruction-tuned model" },
      { name: "Alpaca-30B", size: "18.0GB", description: "Large Stanford model" },
      { name: "OpenBuddy-34B", size: "19.0GB", description: "Large cross-lingual assistant" }
    ],
    reasoning: [
      { name: "WizardMath-70B (8-bit)", size: "38.5GB", description: "Premier math reasoning" },
      { name: "MetaMath-70B (8-bit)", size: "38.0GB", description: "Advanced mathematical AI" },
      { name: "Goat-70B (8-bit)", size: "35.0GB", description: "Arithmetic reasoning specialist" },
      { name: "MAmmoTH-70B (8-bit)", size: "38.2GB", description: "Large mathematical model" }
    ],
    multimodal: [
      { name: "LLaVA-34B", size: "19.0GB", description: "Large vision-language model" },
      { name: "CogVLM-17B", size: "17.0GB", description: "Tsinghua's vision-language model" },
      { name: "Qwen-VL-Chat", size: "9.6GB", description: "Alibaba's multimodal chat model" }
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
      { name: "GPT-NeoX-20B", size: "40GB", description: "EleutherAI's large model" }
    ],
    code: [
      { name: "CodeLlama-34B", size: "68GB", description: "Full precision code model" },
      { name: "DeepSeek-Coder-33B", size: "66GB", description: "Full precision coding AI" },
      { name: "StarCoder-15B", size: "30GB", description: "Full precision programming" },
      { name: "WizardCoder-34B", size: "68GB", description: "Full precision coding specialist" },
      { name: "Code-Davinci-002", size: "175GB", description: "OpenAI's coding model (hypothetical)" }
    ],
    reasoning: [
      { name: "WizardMath-70B", size: "130GB", description: "Full precision mathematics" },
      { name: "Goat-70B", size: "132GB", description: "Full precision arithmetic" },
      { name: "MetaMath-70B", size: "130GB", description: "Premier reasoning model" },
      { name: "Orca-2-70B", size: "131GB", description: "Microsoft's large reasoning model" },
      { name: "MAmmoTH-70B", size: "130GB", description: "Large mathematical specialist" }
    ],
    multimodal: [
      { name: "Flamingo-80B", size: "160GB", description: "Large multimodal model" },
      { name: "BLIP-2-FlanT5-XXL", size: "45GB", description: "Vision-language specialist" },
      { name: "LLaVA-NeXT-34B", size: "68GB", description: "Next-gen vision-language model" },
      { name: "InstructBLIP-FlanT5-XXL", size: "48GB", description: "Large instruction multimodal" }
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
