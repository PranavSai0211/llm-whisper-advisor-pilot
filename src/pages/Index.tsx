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
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { FAQ } from '@/components/FAQ';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { Stats } from '@/components/Stats';
import { Brain, Cpu, HardDrive, Smartphone, Laptop, Zap, Download, Settings, ArrowRight, Star } from 'lucide-react';
import { extractNumericRam, getModelRecommendations, PERFORMANCE_TIERS } from '@/utils/llmData';
import { ModelComparison } from '@/components/ModelComparison';
import { DownloadManager } from '@/components/DownloadManager';
import { PerformanceTips } from '@/components/PerformanceTips';
import { ModelFavorites } from '@/components/ModelFavorites';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors">
      <DarkModeToggle />
      <KeyboardShortcuts />
      
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Brain className="h-20 w-20 animate-pulse" />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center">
                <Star className="h-4 w-4" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            🧠 LLM Compatibility Advisor
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover the perfect AI model for your device from our curated collection of <strong>150+ popular open source models</strong>. 
            Get instant recommendations with advanced quantization options and precise download sizes!
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Smart Downloads
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-colors">
              <Settings className="h-5 w-5 mr-2" />
              Quantization Support
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-colors">
              <Zap className="h-5 w-5 mr-2" />
              Performance Optimized
            </Badge>
          </div>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Section */}
        <Stats />

        {/* Enhanced Quick Device Analyzer */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
            <CardTitle className="flex items-center text-2xl">
              <Cpu className="h-6 w-6 mr-2 text-blue-600" />
              Quick Device Analysis
              <Badge variant="outline" className="ml-auto">AI Powered</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Device Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Device Type</label>
                <Select value={selectedDevice} onValueChange={(value: 'laptop' | 'mobile') => setSelectedDevice(value)}>
                  <SelectTrigger className="h-12">
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
                  className="font-mono h-12 text-lg"
                />
              </div>

              {/* Operating System */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Operating System</label>
                <Select value={selectedOS} onValueChange={setSelectedOS}>
                  <SelectTrigger className="h-12">
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

            {/* Enhanced Quick Results */}
            {ramValue && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-xl flex items-center">
                    💡 AI Recommendation
                    <Badge variant="secondary" className="ml-2">Personalized</Badge>
                  </h3>
                  <Badge variant="outline" className="text-sm bg-white dark:bg-gray-800">
                    {recommendations.performanceTier}
                  </Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-lg">{recommendations.recommendation}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{recommendations.additionalInfo}</p>
                
                {/* Enhanced RAM Usage Indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Recommended Usage</span>
                    <span className="font-mono">{Math.min(ramValue * 0.8, ramValue)}GB / {ramValue}GB</span>
                  </div>
                  <Progress 
                    value={(Math.min(ramValue * 0.8, ramValue) / ramValue) * 100} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Conservative</span>
                    <span>Optimal Performance Zone</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 lg:w-[800px] mx-auto h-12">
            <TabsTrigger value="recommendations" className="text-sm">Models</TabsTrigger>
            <TabsTrigger value="comparison" className="text-sm">Compare</TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm">Favorites</TabsTrigger>
            <TabsTrigger value="downloads" className="text-sm">Downloads</TabsTrigger>
            <TabsTrigger value="quantization" className="text-sm">Quantization</TabsTrigger>
            <TabsTrigger value="analyzer" className="text-sm">Analyzer</TabsTrigger>
            <TabsTrigger value="explorer" className="text-sm">Explorer</TabsTrigger>
            <TabsTrigger value="charts" className="text-sm">Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <ModelRecommendations 
              ramValue={ramValue} 
              deviceType={selectedDevice}
              recommendations={recommendations}
            />
          </TabsContent>

          <TabsContent value="comparison">
            <ModelComparison />
          </TabsContent>

          <TabsContent value="favorites">
            <ModelFavorites />
          </TabsContent>

          <TabsContent value="downloads">
            <DownloadManager />
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

        {/* Performance Tips Section */}
        <div className="mt-12">
          <PerformanceTips />
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQ />
        </div>

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
                <div key={key} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{tier.name}</h4>
                    <Badge variant="outline">{tier.ramRange}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tier.description}</p>
                  <div className="text-xs text-gray-500">
                    <div><strong>Use Cases:</strong> {tier.useCases.join(', ')}</div>
                    <div className="mt-1"><strong>Examples:</strong> {tier.examples.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <Separator className="mb-8" />
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">🔗 Essential Download & Deployment Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-medium text-lg mb-3">📦 Easy Deployment</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Ollama</strong> - CLI tool for developers</li>
                <li>• <strong>LM Studio</strong> - User-friendly GUI</li>
                <li>• <strong>GPT4All</strong> - Cross-platform app</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-medium text-lg mb-3">🤗 Model Repositories</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Hugging Face Hub</strong> - Main repository</li>
                <li>• <strong>TheBloke Quantized</strong> - Optimized models</li>
                <li>• <strong>Model Collections</strong> - Curated lists</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-medium text-lg mb-3">⚡ Optimization Tips</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>4-bit quantization:</strong> 75% memory savings</li>
                <li>• <strong>8-bit quantization:</strong> 50% memory savings</li>
                <li>• <strong>GPU acceleration:</strong> 10x faster inference</li>
              </ul>
            </Card>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Built with ❤️ for the open source AI community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
