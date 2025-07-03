
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Zap, HardDrive, Cpu, Smartphone } from 'lucide-react';

const tips = {
  optimization: [
    {
      title: "Use 4-bit Quantization",
      description: "Reduces memory usage by 75% with minimal quality loss",
      impact: "High",
      difficulty: "Easy"
    },
    {
      title: "Enable GPU Acceleration", 
      description: "Utilize CUDA or Metal for 5-10x faster inference",
      impact: "Very High",
      difficulty: "Medium"
    },
    {
      title: "Optimize Context Window",
      description: "Reduce context length to save memory and increase speed",
      impact: "Medium",
      difficulty: "Easy"
    },
    {
      title: "Use Memory Mapping",
      description: "Load models efficiently without loading entire model into RAM",
      impact: "High",
      difficulty: "Advanced"
    }
  ],
  hardware: [
    {
      title: "RAM Requirements",
      description: "Ensure you have 1.5x the model size in available RAM",
      impact: "Critical",
      difficulty: "Easy"
    },
    {
      title: "SSD Storage",
      description: "Use fast NVMe SSD for model storage and swapping",
      impact: "Medium",
      difficulty: "Easy"
    },
    {
      title: "CPU Cores",
      description: "More cores help with parallel processing and multitasking",
      impact: "Medium",
      difficulty: "Easy"
    },
    {
      title: "Dedicated GPU",
      description: "Modern GPUs dramatically improve inference speed",
      impact: "Very High",
      difficulty: "Medium"
    }
  ],
  mobile: [
    {
      title: "Choose Smaller Models",
      description: "Use 1B-3B parameter models for mobile devices",
      impact: "High",
      difficulty: "Easy"
    },
    {
      title: "Aggressive Quantization",
      description: "Use Q4_0 or even Q3_K for maximum memory savings",
      impact: "High",
      difficulty: "Easy"
    },
    {
      title: "Batch Processing",
      description: "Process multiple requests together for efficiency",
      impact: "Medium",
      difficulty: "Advanced"
    },
    {
      title: "Background Loading",
      description: "Pre-load models in background to reduce wait times",
      impact: "Medium",
      difficulty: "Advanced"
    }
  ]
};

export const PerformanceTips = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical':
      case 'Very High':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTipsList = (tipsList: typeof tips.optimization) => (
    <div className="space-y-4">
      {tipsList.map((tip, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-lg">{tip.title}</h4>
              <div className="flex gap-2 ml-4">
                <Badge className={getImpactColor(tip.impact)} variant="secondary">
                  {tip.impact}
                </Badge>
                <Badge className={getDifficultyColor(tip.difficulty)} variant="secondary">
                  {tip.difficulty}
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{tip.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Performance Tips & Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="optimization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="optimization" className="flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Optimization
            </TabsTrigger>
            <TabsTrigger value="hardware" className="flex items-center">
              <HardDrive className="h-4 w-4 mr-1" />
              Hardware
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-1" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="optimization" className="mt-6">
            {renderTipsList(tips.optimization)}
          </TabsContent>

          <TabsContent value="hardware" className="mt-6">
            {renderTipsList(tips.hardware)}
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            {renderTipsList(tips.mobile)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
