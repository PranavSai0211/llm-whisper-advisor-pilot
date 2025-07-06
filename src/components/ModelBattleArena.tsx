import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X, Plus, Zap, HardDrive, Cpu, Clock, Search, ChevronDown, Swords } from 'lucide-react';

interface Model {
  name: string;
  size: string;
  parameters: string;
  quantization: string[];
  ramRequirement: string;
  performance: number;
  useCase: string[];
}

const expandedModels: Model[] = [
  {
    name: "Llama 3.1 8B",
    size: "4.7GB",
    parameters: "8B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "6GB+",
    performance: 85,
    useCase: ["General", "Code", "Chat"]
  },
  {
    name: "Mistral 7B",
    size: "4.1GB", 
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "5GB+",
    performance: 82,
    useCase: ["General", "Reasoning"]
  },
  {
    name: "Phi-3 Mini",
    size: "2.3GB",
    parameters: "3.8B", 
    quantization: ["Q4_K_M", "Q8_0"],
    ramRequirement: "3GB+",
    performance: 75,
    useCase: ["Mobile", "Edge"]
  },
  {
    name: "CodeLlama 7B",
    size: "3.8GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "5GB+",
    performance: 88,
    useCase: ["Code", "Programming"]
  },
  {
    name: "Gemma 2B",
    size: "1.4GB",
    parameters: "2B",
    quantization: ["Q4_K_M", "Q8_0"],
    ramRequirement: "2GB+",
    performance: 72,
    useCase: ["Mobile", "Edge", "Lightweight"]
  },
  {
    name: "Orca Mini 3B",
    size: "1.9GB",
    parameters: "3B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "3GB+",
    performance: 78,
    useCase: ["General", "Chat", "Mobile"]
  },
  {
    name: "WizardCoder 15B",
    size: "8.5GB",
    parameters: "15B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "12GB+",
    performance: 92,
    useCase: ["Code", "Programming", "Advanced"]
  },
  {
    name: "Vicuna 13B",
    size: "7.3GB",
    parameters: "13B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "10GB+",
    performance: 87,
    useCase: ["General", "Chat", "Reasoning"]
  },
  {
    name: "Alpaca 7B",
    size: "3.9GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q8_0"],
    ramRequirement: "5GB+",
    performance: 80,
    useCase: ["General", "Instruction"]
  },
  {
    name: "Falcon 7B",
    size: "4.2GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "6GB+",
    performance: 83,
    useCase: ["General", "Multilingual"]
  },
  {
    name: "Llama 2 13B",
    size: "7.4GB",
    parameters: "13B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "10GB+",
    performance: 84,
    useCase: ["General", "Chat", "Research"]
  },
  {
    name: "ChatGLM2 6B",
    size: "3.2GB",
    parameters: "6B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "4GB+",
    performance: 79,
    useCase: ["Chinese", "Multilingual", "Chat"]
  },
  {
    name: "Qwen 7B",
    size: "4.0GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "5GB+",
    performance: 86,
    useCase: ["Multilingual", "General", "Code"]
  },
  {
    name: "Baichuan2 7B",
    size: "3.9GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "5GB+",
    performance: 81,
    useCase: ["Chinese", "General", "Reasoning"]
  },
  {
    name: "Mixtral 8x7B",
    size: "26.9GB",
    parameters: "47B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "32GB+",
    performance: 94,
    useCase: ["Advanced", "General", "Expert"]
  },
  {
    name: "Zephyr 7B",
    size: "4.1GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "5GB+",
    performance: 83,
    useCase: ["Chat", "Instruction", "General"]
  },
  {
    name: "Starling 7B",
    size: "4.0GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "5GB+",
    performance: 85,
    useCase: ["Chat", "Reasoning", "RLHF"]
  },
  {
    name: "OpenHermes 2.5",
    size: "4.1GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "5GB+",
    performance: 84,
    useCase: ["General", "Chat", "Instruction"]
  },
  {
    name: "Dolphin 2.7",
    size: "4.0GB",
    parameters: "7B",
    quantization: ["Q4_K_M", "Q5_K_M", "Q8_0"],
    ramRequirement: "5GB+",
    performance: 82,
    useCase: ["Uncensored", "General", "Creative"]
  },
  {
    name: "Solar 10.7B",
    size: "6.1GB",
    parameters: "10.7B",
    quantization: ["Q4_K_M", "Q5_K_M"],
    ramRequirement: "8GB+",
    performance: 89,
    useCase: ["Advanced", "Reasoning", "General"]
  }
];

export const ModelBattleArena = () => {
  const [selectedModels, setSelectedModels] = useState<Model[]>([expandedModels[0], expandedModels[1]]);
  const [availableModels] = useState<Model[]>(expandedModels);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const addModel = (model: Model) => {
    if (selectedModels.length < 3 && !selectedModels.find(m => m.name === model.name)) {
      setSelectedModels([...selectedModels, model]);
      setOpen(false);
      setSearchValue("");
    }
  };

  const removeModel = (modelName: string) => {
    setSelectedModels(selectedModels.filter(m => m.name !== modelName));
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredModels = availableModels.filter(model => 
    !selectedModels.find(m => m.name === model.name)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Swords className="h-5 w-5 mr-2 text-purple-600" />
            🥊 AI Model Battle Arena
            <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
              ⚔️ Battle up to 3 champions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Enhanced Add Model Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">🎯 Choose Your AI Fighters:</h3>
            <div className="flex gap-2 items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between border-2 border-purple-200 hover:border-purple-300"
                    disabled={selectedModels.length >= 3}
                  >
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      {searchValue || "🔍 Scout for AI warriors..."}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="🔍 Search champions..." 
                      value={searchValue}
                      onValueChange={setSearchValue}
                    />
                    <CommandList>
                      <CommandEmpty>No champions found. 🤔</CommandEmpty>
                      <CommandGroup>
                        {filteredModels.map((model) => (
                          <CommandItem
                            key={model.name}
                            value={model.name}
                            onSelect={() => addModel(model)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">⚡ {model.name}</div>
                                <div className="text-xs text-gray-500">
                                  {model.parameters} • {model.size} • {model.ramRequirement}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                💪 {model.performance}/100
                              </Badge>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300">
                🏟️ {selectedModels.length}/3 fighters ready
              </Badge>
            </div>
          </div>

          {/* Battle Arena Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {selectedModels.map((model, index) => (
              <Card key={model.name} className="relative border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeModel(model.name)}
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100"
                >
                  <X className="h-3 w-3" />
                </Button>
                
                <CardContent className="p-4 pt-8">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    {index === 0 && '🥇'} {index === 1 && '🥈'} {index === 2 && '🥉'} {model.name}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">📦 Size:</span>
                      <Badge variant="outline">{model.size}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">🧠 Parameters:</span>
                      <span className="font-medium">{model.parameters}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">💾 RAM Needed:</span>
                      <span className="font-medium flex items-center">
                        <HardDrive className="h-3 w-3 mr-1" />
                        {model.ramRequirement}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">⚡ Power Level:</span>
                      <span className={`font-medium ${getPerformanceColor(model.performance)}`}>
                        💪 {model.performance}/100
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">🛠️ Optimization:</span>
                      <div className="flex flex-wrap gap-1">
                        {model.quantization.map((quant) => (
                          <Badge key={quant} variant="secondary" className="text-xs">
                            {quant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">🎯 Battle Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {model.useCase.map((useCase) => (
                          <Badge key={useCase} variant="outline" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
