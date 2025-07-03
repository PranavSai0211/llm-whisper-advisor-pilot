
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ModelRecommendations } from '@/components/ModelRecommendations';
import { QuantizationCalculator } from '@/components/QuantizationCalculator';
import { DeviceAnalyzer } from '@/components/DeviceAnalyzer';
import { PerformanceChart } from '@/components/PerformanceChart';
import { ModelExplorer } from '@/components/ModelExplorer';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { FAQ } from '@/components/FAQ';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { Stats } from '@/components/Stats';
import { Brain, Cpu, HardDrive, Smartphone, Laptop, Zap, Download, Settings, ArrowRight, Star, Sparkles, TrendingUp, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-emerald-900 dark:to-cyan-900 transition-all duration-500">
      <DarkModeToggle />
      <KeyboardShortcuts />
      
      {/* Enhanced Hero Section with New Background */}
      <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative animate-bounce">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <Brain className="h-20 w-20 relative z-10 drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center animate-spin">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent animate-fade-in">
            🧠 AI Model Advisor
          </h1>
          
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-cyan-50">
            Discover the perfect AI model for your device from our curated collection of <span className="font-bold text-yellow-200">150+ popular open source models</span>. 
            Get instant recommendations with advanced quantization options and precise download sizes!
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <Download className="h-5 w-5 mr-2" />
                  Smart Downloads
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Intelligent download management with resume support</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <Settings className="h-5 w-5 mr-2" />
                  Quantization Support
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Advanced model compression and optimization</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <Zap className="h-5 w-5 mr-2" />
                  Performance Optimized
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Optimized for maximum performance on your hardware</p>
              </TooltipContent>
            </Tooltip>
            
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-yellow-400/30">
              <TrendingUp className="h-5 w-5 mr-2" />
              Latest Models
            </Badge>
          </div>
          
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0">
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Section */}
        <Stats />

        {/* Enhanced Quick Device Analyzer */}
        <Card className="mb-8 border-2 border-emerald-200 dark:border-emerald-800 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/30">
          <CardHeader className="bg-gradient-to-r from-emerald-100 via-cyan-100 to-blue-100 dark:from-emerald-900 dark:via-cyan-900 dark:to-blue-900">
            <CardTitle className="flex items-center text-2xl">
              <div className="relative">
                <Cpu className="h-6 w-6 mr-2 text-emerald-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              Quick Device Analysis
              <Badge variant="outline" className="ml-auto bg-gradient-to-r from-emerald-100 to-cyan-100 border-emerald-300">
                <Shield className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Device Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Device Type</label>
                <Select value={selectedDevice} onValueChange={(value: 'laptop' | 'mobile') => setSelectedDevice(value)}>
                  <SelectTrigger className="h-12 border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">
                      <div className="flex items-center">
                        <Laptop className="h-4 w-4 mr-2 text-emerald-600" />
                        Laptop/Desktop
                      </div>
                    </SelectItem>
                    <SelectItem value="mobile">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2 text-cyan-600" />
                        Mobile/Tablet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* RAM Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Available RAM</label>
                <Input
                  placeholder="e.g., 8GB, 16GB, 32GB"
                  value={ramInput}
                  onChange={(e) => setRamInput(e.target.value)}
                  className="font-mono h-12 text-lg border-2 border-emerald-200 hover:border-emerald-300 focus:border-emerald-400 transition-colors"
                />
              </div>

              {/* Operating System */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Operating System</label>
                <Select value={selectedOS} onValueChange={setSelectedOS}>
                  <SelectTrigger className="h-12 border-2 border-emerald-200 hover:border-emerald-300 transition-colors">
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
              <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 dark:from-emerald-900/30 dark:via-cyan-900/30 dark:to-blue-900/30 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-xl flex items-center">
                    💡 AI Recommendation
                    <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-emerald-100 to-cyan-100">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Personalized
                    </Badge>
                  </h3>
                  <Badge variant="outline" className="text-sm bg-white dark:bg-gray-800 border-emerald-300">
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
                    className="h-4 bg-gradient-to-r from-emerald-200 to-cyan-200"
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 lg:w-[800px] mx-auto h-14 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900">
            <TabsTrigger value="recommendations" className="text-sm font-medium">Models</TabsTrigger>
            <TabsTrigger value="comparison" className="text-sm font-medium">Compare</TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm font-medium">Favorites</TabsTrigger>
            <TabsTrigger value="downloads" className="text-sm font-medium">Downloads</TabsTrigger>
            <TabsTrigger value="quantization" className="text-sm font-medium">Quantization</TabsTrigger>
            <TabsTrigger value="analyzer" className="text-sm font-medium">Analyzer</TabsTrigger>
            <TabsTrigger value="explorer" className="text-sm font-medium">Explorer</TabsTrigger>
            <TabsTrigger value="charts" className="text-sm font-medium">Charts</TabsTrigger>
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
        <Card className="mt-8 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-emerald-600" />
              Performance Tiers Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(PERFORMANCE_TIERS).map(([key, tier]) => (
                <div key={key} className="p-4 border rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 hover:scale-105 border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{tier.name}</h4>
                    <Badge variant="outline" className="border-emerald-300">{tier.ramRange}</Badge>
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
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900">
              <h4 className="font-medium text-lg mb-3">📦 Easy Deployment</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Ollama</strong> - CLI tool for developers</li>
                <li>• <strong>LM Studio</strong> - User-friendly GUI</li>
                <li>• <strong>GPT4All</strong> - Cross-platform app</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-900">
              <h4 className="font-medium text-lg mb-3">🤗 Model Repositories</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Hugging Face Hub</strong> - Main repository</li>
                <li>• <strong>TheBloke Quantized</strong> - Optimized models</li>
                <li>• <strong>Model Collections</strong> - Curated lists</li>
              </ul>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
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
