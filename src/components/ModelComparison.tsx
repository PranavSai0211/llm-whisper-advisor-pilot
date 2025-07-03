
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Zap, HardDrive, Cpu, Clock } from 'lucide-react';

interface Model {
  name: string;
  size: string;
  parameters: string;
  quantization: string[];
  ramRequirement: string;
  performance: number;
  useCase: string[];
}

const sampleModels: Model[] = [
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
  }
];

export const ModelComparison = () => {
  const [selectedModels, setSelectedModels] = useState<Model[]>([sampleModels[0], sampleModels[1]]);
  const [availableModels] = useState<Model[]>(sampleModels);

  const addModel = (model: Model) => {
    if (selectedModels.length < 3 && !selectedModels.find(m => m.name === model.name)) {
      setSelectedModels([...selectedModels, model]);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Model Comparison Tool
            <Badge variant="secondary" className="ml-2">Compare up to 3 models</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Model Buttons */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Add Models to Compare:</h3>
            <div className="flex flex-wrap gap-2">
              {availableModels.map((model) => (
                <Button
                  key={model.name}
                  variant="outline"
                  size="sm"
                  onClick={() => addModel(model)}
                  disabled={selectedModels.find(m => m.name === model.name) !== undefined || selectedModels.length >= 3}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {model.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {selectedModels.map((model, index) => (
              <Card key={model.name} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeModel(model.name)}
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
                
                <CardContent className="p-4 pt-8">
                  <h4 className="font-semibold text-lg mb-4">{model.name}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Size:</span>
                      <Badge variant="outline">{model.size}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Parameters:</span>
                      <span className="font-medium">{model.parameters}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">RAM Required:</span>
                      <span className="font-medium flex items-center">
                        <HardDrive className="h-3 w-3 mr-1" />
                        {model.ramRequirement}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Performance:</span>
                      <span className={`font-medium ${getPerformanceColor(model.performance)}`}>
                        {model.performance}/100
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Quantization:</span>
                      <div className="flex flex-wrap gap-1">
                        {model.quantization.map((quant) => (
                          <Badge key={quant} variant="secondary" className="text-xs">
                            {quant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Use Cases:</span>
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
