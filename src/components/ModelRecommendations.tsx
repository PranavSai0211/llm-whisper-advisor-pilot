
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Download, Cpu, HardDrive, Zap } from 'lucide-react';
import { ModelRecommendation } from '@/utils/llmData';

interface ModelRecommendationsProps {
  ramValue: number | null;
  deviceType: 'laptop' | 'mobile';
  recommendations: ModelRecommendation;
}

export const ModelRecommendations = ({ ramValue, deviceType, recommendations }: ModelRecommendationsProps) => {
  if (!ramValue || !recommendations.detailedModels || Object.keys(recommendations.detailedModels).length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your device RAM to see personalized model recommendations</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getModelIcon = (category: string) => {
    switch (category) {
      case 'general': return '🎯';
      case 'code': return '💻';
      case 'chat': return '💬';
      case 'reasoning': return '🧮';
      case 'multimodal': return '👁️';
      default: return '🤖';
    }
  };

  const getDownloadIcon = (modelName: string) => {
    if (modelName.includes('Llama')) return '🦙';
    if (modelName.includes('Mistral')) return '🌪️';
    if (modelName.includes('Gemma')) return '💎';
    if (modelName.includes('Phi')) return '🔷';
    return '🤗';
  };

  const getQuantizedSizes = (originalSize: string) => {
    const sizeMatch = originalSize.match(/(\d+\.?\d*)(GB|MB)/);
    if (!sizeMatch) return null;
    
    const value = parseFloat(sizeMatch[1]);
    const unit = sizeMatch[2];
    
    if (unit === 'MB') {
      return {
        fp16: originalSize,
        q8: `${Math.round(value * 0.5)}MB`,
        q4: `${Math.round(value * 0.25)}MB`
      };
    } else {
      return {
        fp16: originalSize,
        q8: `${(value * 0.5).toFixed(1)}GB`,
        q4: `${(value * 0.25).toFixed(1)}GB`
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center justify-between">
            <span>🎯 Recommended Models for {ramValue}GB RAM</span>
            <Badge variant="outline" className="text-sm">
              {recommendations.performanceTier}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                Performance Level
              </h3>
              <p className="text-sm text-gray-600 mb-4">{recommendations.additionalInfo}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory Utilization</span>
                  <span>{Math.min(ramValue * 0.8, ramValue)}GB / {ramValue}GB</span>
                </div>
                <Progress value={(Math.min(ramValue * 0.8, ramValue) / ramValue) * 100} className="h-2" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <HardDrive className="h-4 w-4 mr-2 text-gray-500" />
                Storage Requirements
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>FP16 Models:</span>
                  <span className="text-red-600">2-8GB each</span>
                </div>
                <div className="flex justify-between">
                  <span>8-bit Quantized:</span>
                  <span className="text-yellow-600">1-4GB each</span>
                </div>
                <div className="flex justify-between">
                  <span>4-bit Quantized:</span>
                  <span className="text-green-600">0.5-2GB each</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Categories */}
      <Tabs defaultValue={Object.keys(recommendations.detailedModels)[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          {Object.keys(recommendations.detailedModels).map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
              {getModelIcon(category)} {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(recommendations.detailedModels).map(([category, models]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center">
              <span className="mr-2">{getModelIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)} Models
              <Badge variant="secondary" className="ml-2">{models.length} available</Badge>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {models.slice(0, 8).map((model, index) => {
                const quantizedSizes = getQuantizedSizes(model.size);
                
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg flex items-center">
                            <span className="mr-2">{getDownloadIcon(model.name)}</span>
                            {model.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {model.size}
                        </Badge>
                      </div>

                      {quantizedSizes && (
                        <div className="space-y-2 mb-4">
                          <h5 className="text-sm font-medium">Quantization Options:</h5>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-red-50 p-2 rounded text-center">
                              <div className="font-medium">FP16</div>
                              <div className="text-red-600">{quantizedSizes.fp16}</div>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded text-center">
                              <div className="font-medium">8-bit</div>
                              <div className="text-yellow-600">{quantizedSizes.q8}</div>
                            </div>
                            <div className="bg-green-50 p-2 rounded text-center">
                              <div className="font-medium">4-bit</div>
                              <div className="text-green-600">{quantizedSizes.q4}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Hugging Face
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ollama
                        </Button>
                      </div>

                      {/* Compatibility indicator */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {deviceType === 'laptop' ? '💻 Desktop Ready' : '📱 Mobile Compatible'}
                        </span>
                        <div className="flex items-center">
                          {ramValue >= 8 && <Badge variant="secondary" className="text-xs">GPU Ready</Badge>}
                          {ramValue >= 16 && <Badge variant="secondary" className="text-xs ml-1">Fast Inference</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {models.length > 8 && (
              <div className="text-center mt-4">
                <Button variant="outline">
                  View All {models.length} {category} Models
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
