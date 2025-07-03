
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is quantization and why does it matter?",
    answer: "Quantization reduces model precision from 16-bit to 8-bit or 4-bit, significantly reducing memory usage and download sizes. For example, a 7B parameter model that normally takes 14GB can be reduced to 3.5GB with 4-bit quantization while maintaining most of its performance."
  },
  {
    question: "How much RAM do I really need for running LLMs?",
    answer: "As a rule of thumb, you need about 2GB of RAM per billion parameters for full precision models. With 4-bit quantization, this drops to about 0.5GB per billion parameters. For casual use, 8GB RAM is sufficient for smaller models, while 16GB+ is recommended for larger, more capable models."
  },
  {
    question: "What's the difference between Ollama, LM Studio, and Hugging Face?",
    answer: "Ollama is a command-line tool for running models locally, LM Studio provides a user-friendly GUI interface, and Hugging Face is the main repository where most open-source models are hosted. You can download from Hugging Face and run with either Ollama or LM Studio."
  },
  {
    question: "Can I run these models on my phone or tablet?",
    answer: "Yes! Many smaller models (1-3B parameters) can run on modern smartphones and tablets with sufficient RAM. iOS devices with 6GB+ RAM and Android devices with 8GB+ RAM can handle lightweight models effectively."
  },
  {
    question: "Which models are best for coding assistance?",
    answer: "Code-specific models like CodeLlama, StarCoder, and Phi-3 are optimized for programming tasks. However, general models like Llama 3 and Mistral also perform well on coding tasks while being more versatile for other uses."
  }
];

export const FAQ = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqData.map((faq, index) => (
          <Collapsible
            key={index}
            open={openItems.includes(index)}
            onOpenChange={() => toggleItem(index)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold">{faq.question}</h3>
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${
                  openItems.includes(index) ? 'transform rotate-180' : ''
                }`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 text-gray-600 dark:text-gray-300">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};
