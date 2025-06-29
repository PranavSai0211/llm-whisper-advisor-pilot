
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

export const PerformanceChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('ram_distribution');

  // Sample data for different charts
  const ramDistributionData = [
    { ram: '2GB', count: 15, percentage: 12 },
    { ram: '4GB', count: 25, percentage: 20 },
    { ram: '6GB', count: 20, percentage: 16 },
    { ram: '8GB', count: 35, percentage: 28 },
    { ram: '16GB', count: 20, percentage: 16 },
    { ram: '32GB+', count: 10, percentage: 8 }
  ];

  const modelPerformanceData = [
    { model: 'TinyLlama-1B', ram_req: 1, quality: 65, speed: 95 },
    { model: 'Phi-2', ram_req: 3, quality: 78, speed: 85 },
    { model: 'Mistral-7B', ram_req: 4, quality: 88, speed: 75 },
    { model: 'Llama-2-7B', ram_req: 4, quality: 85, speed: 70 },
    { model: 'Vicuna-13B', ram_req: 7, quality: 90, speed: 60 },
    { model: 'CodeLlama-13B', ram_req: 7, quality: 92, speed: 58 },
    { model: 'Mixtral-8x7B', ram_req: 20, quality: 95, speed: 45 },
    { model: 'Llama-2-70B', ram_req: 35, quality: 98, speed: 25 }
  ];

  const quantizationImpactData = [
    { format: 'FP16', size_reduction: 0, quality: 100, speed: 100 },
    { format: 'FP8', size_reduction: 50, quality: 98, speed: 110 },
    { format: 'INT8', size_reduction: 50, quality: 95, speed: 120 },
    { format: 'INT4', size_reduction: 75, quality: 85, speed: 140 },
    { format: 'INT2', size_reduction: 87, quality: 70, speed: 160 }
  ];

  const deviceCompatibilityData = [
    { device: 'Entry (≤4GB)', compatible: 15, total: 40 },
    { device: 'Standard (5-8GB)', compatible: 35, total: 40 },
    { device: 'Professional (9-16GB)', compatible: 38, total: 40 },
    { device: 'High-end (17GB+)', compatible: 40, total: 40 }
  ];

  const useCaseDistribution = [
    { name: 'General Chat', value: 35, color: '#8884d8' },
    { name: 'Code Generation', value: 25, color: '#82ca9d' },
    { name: 'Content Writing', value: 20, color: '#ffc658' },
    { name: 'Research/Analysis', value: 12, color: '#ff7300' },
    { name: 'Creative Tasks', value: 8, color: '#8dd1e1' }
  ];

  const performanceTrendsData = [
    { month: 'Jan', small_models: 20, medium_models: 15, large_models: 5 },
    { month: 'Feb', small_models: 25, medium_models: 18, large_models: 7 },
    { month: 'Mar', small_models: 30, medium_models: 22, large_models: 10 },
    { month: 'Apr', small_models: 32, medium_models: 28, large_models: 12 },
    { month: 'May', small_models: 35, medium_models: 30, large_models: 15 },
    { month: 'Jun', small_models: 38, medium_models: 35, large_models: 18 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
              {entry.dataKey.includes('percentage') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance Analytics
            </div>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ram_distribution">RAM Distribution</SelectItem>
                <SelectItem value="model_performance">Model Performance</SelectItem>
                <SelectItem value="quantization_impact">Quantization Impact</SelectItem>
                <SelectItem value="compatibility">Device Compatibility</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Main Chart Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedMetric === 'ram_distribution' && 'RAM Distribution Analysis'}
                {selectedMetric === 'model_performance' && 'Model Performance vs RAM Requirements'}
                {selectedMetric === 'quantization_impact' && 'Quantization Impact on Performance'}
                {selectedMetric === 'compatibility' && 'Device Compatibility by RAM Tier'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {selectedMetric === 'ram_distribution' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ramDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ram" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" fill="#8884d8" />
                      <Bar dataKey="percentage" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {selectedMetric === 'model_performance' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={modelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ram_req" name="RAM Required (GB)" />
                      <YAxis dataKey="quality" name="Quality Score" />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                <p className="font-semibold">{data.model}</p>
                                <p>RAM Required: {data.ram_req}GB</p>
                                <p>Quality Score: {data.quality}/100</p>
                                <p>Speed Score: {data.speed}/100</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter dataKey="quality" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                )}

                {selectedMetric === 'quantization_impact' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quantizationImpactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="format" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="quality" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="speed" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="size_reduction" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {selectedMetric === 'compatibility' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deviceCompatibilityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="device" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="compatible" fill="#82ca9d" />
                      <Bar dataKey="total" fill="#8884d8" opacity={0.3} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel with Additional Charts */}
        <div className="space-y-6">
          {/* Use Case Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="h-4 w-4 mr-2" />
                Use Case Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={useCaseDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {useCaseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">150+</div>
                  <div className="text-sm text-gray-600">Available Models</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-sm text-gray-600">Avg Size Reduction</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8GB</div>
                  <div className="text-sm text-gray-600">Sweet Spot RAM</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">4-bit</div>
                  <div className="text-sm text-gray-600">Popular Format</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Optimization Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Badge variant="secondary" className="w-12 text-xs">RAM</Badge>
                  <span className="ml-2">8GB+ for 7B models</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="w-12 text-xs">QUANT</Badge>
                  <span className="ml-2">4-bit saves 75% space</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="w-12 text-xs">GPU</Badge>
                  <span className="ml-2">Accelerates inference</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="w-12 text-xs">TOOL</Badge>
                  <span className="ml-2">Ollama for easy setup</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Adoption Trends</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Model Adoption Trends (2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="small_models" stroke="#8884d8" strokeWidth={2} name="Small Models (≤7B)" />
                    <Line type="monotone" dataKey="medium_models" stroke="#82ca9d" strokeWidth={2} name="Medium Models (8-30B)" />
                    <Line type="monotone" dataKey="large_models" stroke="#ffc658" strokeWidth={2} name="Large Models (30B+)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality vs Size Trade-offs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modelPerformanceData.slice(0, 6).map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium text-sm">{model.model}</div>
                        <div className="text-xs text-gray-600">{model.ram_req}GB RAM</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Q: {model.quality}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          S: {model.speed}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quantization Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quantizationImpactData.map((format, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium text-sm">{format.format}</div>
                        <div className="text-xs text-gray-600">
                          {format.size_reduction}% smaller
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Quality: {format.quality}%</div>
                        <div className="text-xs text-gray-600">Speed: {format.speed}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎯 Beginners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Start with Ollama</div>
                  <div>• Try Llama-2-7B-Chat</div>
                  <div>• Use 4-bit quantization</div>
                  <div>• 8GB RAM minimum</div>
                  <div>• Focus on chat models first</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Power Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Experiment with 13B models</div>
                  <div>• Try specialized models</div>
                  <div>• Use GPU acceleration</div>
                  <div>• 16GB+ RAM recommended</div>
                  <div>• Monitor performance metrics</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🚀 Researchers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Access to 70B+ models</div>
                  <div>• Full precision for fine-tuning</div>
                  <div>• Multi-GPU setups</div>
                  <div>• 32GB+ RAM essential</div>
                  <div>• Custom quantization schemes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
