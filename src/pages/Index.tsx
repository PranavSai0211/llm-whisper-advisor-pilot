
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ModelRecommendations } from '@/components/ModelRecommendations';
import { QuantizationCalculator } from '@/components/QuantizationCalculator';
import { DeviceAnalyzer } from '@/components/DeviceAnalyzer';
import { PerformanceChart } from '@/components/PerformanceChart';
import { ModelExplorer } from '@/components/ModelExplorer';
import { Brain, Cpu, HardDrive, Smartphone, Laptop, Zap, Download, Settings } from 'lucide-react';
import { extractNumericRam, getModelRecommendations, PERFORMANCE_TIERS } from '@/utils/llmData';

const Index = () => {
  const [selectedDevice, setSelectedDevice] = useState<'laptop' | 'mobile'>('laptop');
  const [ramInput, setRamInput] = useState('8GB');
  const [selectedOS, setSelectedOS] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const ramValue = useMemo(() => extractNumericRam(ramInput), [ramInput]);
  const recommendations = useMemo(() => getModelRecommendations(ramInput), [ramInput]);

  const deviceIcons = {
    laptop: <Laptop className="h-5 w-5" />,
    mobile: <Smartphone className="h-5 w-5" />
  };

  const osOptions = {
    laptop: ['Windows 11', 'Windows 10', 'macOS Monterey', 'macOS Ventura', 'Ubuntu 22.04', 'Fedora 36'],
    mobile: ['Android 13', 'Android 12', 'iOS 16', 'iOS 15']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4">🧠 LLM Compatibility Advisor</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get personalized recommendations from <strong>150+ popular open source AI models</strong> with 
            advanced quantization options and download sizes!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Download className="h-4 w-4 mr-2" />
              Smart Downloads
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Settings className="h-4 w-4 mr-2" />
              Quantization Support
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Performance Optimized
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Device Analyzer */}
        <Card className="mb-8 border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="flex items-center text-2xl">
              <Cpu className="h-6 w-6 mr-2 text-blue-600" />
              Quick Device Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Device Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Device Type</label>
                <Select value={selectedDevice} onValueChange={(value: 'laptop' | 'mobile') => setSelectedDevice(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">
                      <div className="flex items-center">
                        <Laptop className="h-4 w-4 mr-2" />
                        Laptop/Desktop
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Mobile/Tablet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* RAM Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Available RAM</label>
                <Input
                  placeholder="e.g., 8GB, 16GB, 32GB"
                  value={ramInput}
                  onChange={(e) => setRamInput(e.target.value)}
                  className="font-mono"
                />
              </div>

              {/* Operating System */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Operating System</label>
                <Select value={selectedOS} onValueChange={setSelectedOS}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS" />
                  </SelectTrigger>
                  <SelectContent>
                    {osOptions[selectedDevice].map((os) => (
                      <SelectItem key={os} value={os}>{os}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Results */}
            {ramValue && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">💡 Quick Recommendation</h3>
                  <Badge variant="outline" className="text-sm">
                    {recommendations.performanceTier}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-2">{recommendations.recommendation}</p>
                <p className="text-sm text-gray-600">{recommendations.additionalInfo}</p>
                
                {/* RAM Usage Indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recommended Usage</span>
                    <span>{Math.min(ramValue * 0.8, ramValue)}GB / {ramValue}GB</span>
                  </div>
                  <Progress value={(Math.min(ramValue * 0.8, ramValue) / ramValue) * 100} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px] mx-auto">
            <TabsTrigger value="recommendations">Models</TabsTrigger>
            <TabsTrigger value="quantization">Quantization</TabsTrigger>
            <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <ModelRecommendations 
              ramValue={ramValue} 
              deviceType={selectedDevice}
              recommendations={recommendations}
            />
          </TabsContent>

          <TabsContent value="quantization">
            <QuantizationCalculator ramValue={ramValue} />
          </TabsContent>

          <TabsContent value="analyzer">
            <DeviceAnalyzer 
              ramValue={ramValue}
              deviceType={selectedDevice}
              operatingSystem={selectedOS}
            />
          </TabsContent>

          <TabsContent value="explorer">
            <ModelExplorer 
              selectedTier={selectedTier}
              selectedCategory={selectedCategory}
              onTierChange={setSelectedTier}
              onCategoryChange={setSelectedCategory}
            />
          </TabsContent>

          <TabsContent value="charts">
            <PerformanceChart />
          </TabsContent>
        </Tabs>

        {/* Performance Tiers Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="h-5 w-5 mr-2" />
              Performance Tiers Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(PERFORMANCE_TIERS).map(([key, tier]) => (
                <div key={key} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{tier.name}</h4>
                    <Badge variant="outline">{tier.ramRange}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                  <div className="text-xs text-gray-500">
                    <div>Use Cases: {tier.useCases.join(', ')}</div>
                    <div className="mt-1">Examples: {tier.examples.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <Separator className="mb-6" />
          <h3 className="text-lg font-semibold mb-4">🔗 Essential Download & Deployment Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h4 className="font-medium">📦 Easy Deployment</h4>
              <ul className="text-sm space-y-1">
                <li>• Ollama - CLI tool</li>
                <li>• LM Studio - GUI app</li>
                <li>• GPT4All - Desktop app</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🤗 Model Repositories</h4>
              <ul className="text-sm space-y-1">
                <li>• Hugging Face Hub</li>
                <li>• TheBloke Quantized</li>
                <li>• Awesome LLM List</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">⚡ Optimization</h4>
              <ul className="text-sm space-y-1">
                <li>• 4-bit: 75% less memory</li>
                <li>• 8-bit: 50% less memory</li>
                <li>• GPU acceleration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
