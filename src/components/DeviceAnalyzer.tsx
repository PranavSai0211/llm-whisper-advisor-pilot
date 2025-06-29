
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Laptop, Smartphone, Cpu, HardDrive, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface DeviceAnalyzerProps {
  ramValue: number | null;
  deviceType: 'laptop' | 'mobile';
  operatingSystem?: string;
}

export const DeviceAnalyzer = ({ ramValue, deviceType, operatingSystem }: DeviceAnalyzerProps) => {
  if (!ramValue) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your device specifications to see detailed analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getOSInfo = (os: string) => {
    if (!os) return { icon: '💻', optimizations: [], limitations: [] };
    
    const osLower = os.toLowerCase();
    if (osLower.includes('windows')) {
      return {
        icon: '🪟',
        optimizations: ['DirectML support', 'CUDA compatibility', 'Wide tool support'],
        limitations: ['Higher memory overhead', 'Background processes'],
        recommendedTools: ['Ollama', 'LM Studio', 'oobabooga']
      };
    } else if (osLower.includes('mac') || osLower.includes('darwin')) {
      return {
        icon: '🍎',
        optimizations: ['Metal acceleration', 'Unified memory', 'Power efficiency'],
        limitations: ['Memory pressure handling', 'Tool compatibility'],
        recommendedTools: ['Ollama', 'LM Studio', 'MLX']
      };
    } else if (osLower.includes('linux') || osLower.includes('ubuntu')) {
      return {
        icon: '🐧',
        optimizations: ['Maximum flexibility', 'CUDA support', 'Low overhead'],
        limitations: ['Setup complexity', 'Driver dependencies'],
        recommendedTools: ['Ollama', 'transformers', 'llama.cpp']
      };
    }
    return { icon: '💻', optimizations: [], limitations: [], recommendedTools: [] };
  };

  const osInfo = getOSInfo(operatingSystem || '');

  const getPerformanceCategory = (ram: number) => {
    if (ram <= 4) return { name: 'Entry Level', color: 'red', score: 25 };
    if (ram <= 8) return { name: 'Standard', color: 'yellow', score: 50 };
    if (ram <= 16) return { name: 'Professional', color: 'blue', score: 75 };
    if (ram <= 32) return { name: 'High Performance', color: 'green', score: 90 };
    return { name: 'Workstation', color: 'purple', score: 100 };
  };

  const category = getPerformanceCategory(ramValue);

  const getOptimalModels = (ram: number, device: string) => {
    const models = [];
    
    if (ram >= 4) models.push({ name: 'Phi-2', size: '2.7B', optimized: device === 'laptop' });
    if (ram >= 6) models.push({ name: 'Mistral-7B', size: '7B', optimized: true });
    if (ram >= 8) models.push({ name: 'Llama-2-7B', size: '7B', optimized: true });
    if (ram >= 12) models.push({ name: 'Vicuna-13B', size: '13B', optimized: device === 'laptop' });
    if (ram >= 16) models.push({ name: 'CodeLlama-13B', size: '13B', optimized: true });
    if (ram >= 24) models.push({ name: 'Mixtral-8x7B', size: '47B MoE', optimized: device === 'laptop' });
    if (ram >= 32) models.push({ name: 'Llama-2-70B (4-bit)', size: '70B', optimized: device === 'laptop' });
    
    return models;
  };

  const optimalModels = getOptimalModels(ramValue, deviceType);

  const getSystemRecommendations = (ram: number, os: string, device: string) => {
    const recommendations = [];
    
    // RAM recommendations
    if (ram < 8) {
      recommendations.push({
        type: 'warning',
        title: 'Consider RAM upgrade',
        description: 'For better LLM performance, 8GB+ RAM is recommended'
      });
    }
    
    // OS-specific recommendations
    if (os.toLowerCase().includes('windows') && ram >= 16) {
      recommendations.push({
        type: 'info',
        title: 'Enable WSL2',
        description: 'Linux subsystem can improve performance for some tools'
      });
    }
    
    if (os.toLowerCase().includes('mac')) {
      recommendations.push({
        type: 'success',
        title: 'Metal acceleration',
        description: 'Use MLX or Metal-optimized models for best performance'
      });
    }
    
    // Device-specific recommendations
    if (device === 'mobile' && ram < 6) {
      recommendations.push({
        type: 'warning',
        title: 'Limited mobile performance',
        description: 'Consider cloud-based solutions for complex tasks'
      });
    }
    
    return recommendations;
  };

  const recommendations = getSystemRecommendations(ramValue, operatingSystem || '', deviceType);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center">
            {deviceType === 'laptop' ? <Laptop className="h-5 w-5 mr-2" /> : <Smartphone className="h-5 w-5 mr-2" />}
            Device Analysis - {deviceType === 'laptop' ? 'Laptop/Desktop' : 'Mobile/Tablet'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Performance Category</span>
                <Badge variant="outline" className={`border-${category.color}-300`}>
                  {category.name}
                </Badge>
              </div>
              <Progress value={category.score} className="h-3" />
              <p className="text-xs text-gray-600">
                Based on {ramValue}GB RAM configuration
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <HardDrive className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm font-medium">Memory Analysis</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total RAM:</span>
                  <span className="font-mono">{ramValue}GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Available for LLM:</span>
                  <span className="font-mono text-green-600">~{(ramValue * 0.7).toFixed(1)}GB</span>
                </div>
                <div className="flex justify-between">
                  <span>System Reserved:</span>
                  <span className="font-mono text-gray-500">~{(ramValue * 0.3).toFixed(1)}GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{osInfo.icon}</span>
                <span className="text-sm font-medium">Operating System</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">{operatingSystem || 'Not specified'}</div>
                {osInfo.recommendedTools && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-600">Recommended tools:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {osInfo.recommendedTools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compatibility">Models</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="recommendations">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {ramValue >= 8 ? '✅' : '❌'}
                  </div>
                  <div className="text-sm">7B Models</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {ramValue >= 16 ? '✅' : '❌'}
                  </div>
                  <div className="text-sm">13B Models</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {ramValue >= 32 ? '✅' : '❌'}
                  </div>
                  <div className="text-sm">30B+ Models</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {deviceType === 'laptop' && ramValue >= 16 ? '⚡' : '🐌'}
                  </div>
                  <div className="text-sm">Speed</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Estimated Performance</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inference Speed</span>
                      <span>{ramValue >= 16 ? 'Fast' : ramValue >= 8 ? 'Medium' : 'Slow'}</span>
                    </div>
                    <Progress value={Math.min((ramValue / 32) * 100, 100)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Context Window</span>
                      <span>{ramValue >= 16 ? '8K+' : ramValue >= 8 ? '4K' : '2K'}</span>
                    </div>
                    <Progress value={Math.min((ramValue / 24) * 100, 100)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Multi-tasking</span>
                      <span>{ramValue >= 24 ? 'Excellent' : ramValue >= 16 ? 'Good' : 'Limited'}</span>
                    </div>
                    <Progress value={Math.min((ramValue / 32) * 100, 100)} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimal Model Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optimalModels.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-sm text-gray-600">Model Size: {model.size}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {model.optimized ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                      <Badge variant={model.optimized ? "default" : "secondary"}>
                        {model.optimized ? "Optimal" : "Compatible"}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {optimalModels.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Consider upgrading RAM for better model compatibility</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Optimizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {osInfo.optimizations && osInfo.optimizations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ Available Optimizations</h4>
                  <ul className="space-y-1">
                    {osInfo.optimizations.map((opt, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {osInfo.limitations && osInfo.limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2">⚠️ Considerations</h4>
                  <ul className="space-y-1">
                    {osInfo.limitations.map((limit, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <AlertCircle className="h-3 w-3 mr-2 text-yellow-500" />
                        {limit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Memory Optimization</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Close unnecessary applications</li>
                    <li>• Use swap file if needed</li>
                    <li>• Monitor memory usage</li>
                    <li>• Consider quantized models</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Performance Tips</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Use appropriate batch sizes</li>
                    <li>• Enable hardware acceleration</li>
                    <li>• Optimize context length</li>
                    <li>• Profile your workload</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.map((rec, index) => (
            <Alert key={index} className={
              rec.type === 'success' ? 'border-green-200 bg-green-50' :
              rec.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-blue-200 bg-blue-50'
            }>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold">{rec.title}</div>
                <div className="text-sm mt-1">{rec.description}</div>
              </AlertDescription>
            </Alert>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Upgrade Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ramValue < 8 && (
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h5 className="font-semibold">Next: 8GB RAM</h5>
                    <p className="text-sm">Unlock 7B models, better performance</p>
                  </div>
                )}
                {ramValue < 16 && ramValue >= 8 && (
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h5 className="font-semibold">Next: 16GB RAM</h5>
                    <p className="text-sm">Support 13B models, professional use</p>
                  </div>
                )}
                {ramValue < 32 && ramValue >= 16 && (
                  <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                    <h5 className="font-semibold">Next: 32GB RAM</h5>
                    <p className="text-sm">Large models, research capabilities</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
