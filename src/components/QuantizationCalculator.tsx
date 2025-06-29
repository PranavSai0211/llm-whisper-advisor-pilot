
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Cpu, HardDrive, Zap, Download, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuantizationCalculatorProps {
  ramValue: number | null;
}

const QUANTIZATION_FORMATS = {
  fp16: { name: 'FP16 (Full Precision)', reduction: 1, quality: 100, speed: 100 },
  fp8: { name: 'FP8', reduction: 0.5, quality: 98, speed: 110 },
  int8: { name: 'INT8 (8-bit)', reduction: 0.5, quality: 95, speed: 120 },
  int4: { name: 'INT4 (4-bit)', reduction: 0.25, quality: 85, speed: 140 },
  int2: { name: 'INT2 (2-bit)', reduction: 0.125, quality: 70, speed: 160 }
};

const MODEL_SIZES = {
  '1B': 2,
  '3B': 6,
  '7B': 14,
  '13B': 26,
  '30B': 60,
  '70B': 140
};

export const QuantizationCalculator = ({ ramValue }: QuantizationCalculatorProps) => {
  const [selectedModel, setSelectedModel] = useState('7B');
  const [selectedFormat, setSelectedFormat] = useState('int4');
  const [customSize, setCustomSize] = useState('');

  const calculations = useMemo(() => {
    const baseSize = customSize ? parseFloat(customSize) : MODEL_SIZES[selectedModel as keyof typeof MODEL_SIZES];
    if (!baseSize) return null;

    const format = QUANTIZATION_FORMATS[selectedFormat as keyof typeof QUANTIZATION_FORMATS];
    const quantizedSize = baseSize * format.reduction;
    const memorySavings = baseSize - quantizedSize;
    const savingsPercent = ((memorySavings / baseSize) * 100);

    return {
      baseSize,
      quantizedSize,
      memorySavings,
      savingsPercent,
      format,
      canRun: ramValue ? quantizedSize < (ramValue * 0.8) : false
    };
  }, [selectedModel, selectedFormat, customSize, ramValue]);

  const getCompatibilityStatus = (size: number) => {
    if (!ramValue) return { status: 'unknown', message: 'Enter RAM to check compatibility' };
    
    const usableRam = ramValue * 0.8; // 80% usable RAM
    if (size <= usableRam * 0.5) return { status: 'excellent', message: 'Excellent - Plenty of headroom' };
    if (size <= usableRam * 0.7) return { status: 'good', message: 'Good - Comfortable fit' };
    if (size <= usableRam) return { status: 'tight', message: 'Tight fit - May struggle with large contexts' };
    return { status: 'incompatible', message: 'Incompatible - Insufficient RAM' };
  };

  return (
    <div className="space-y-6">
      {/* Calculator Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Quantization Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model Size</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(MODEL_SIZES).map(([size, gb]) => (
                    <SelectItem key={size} value={size}>
                      {size} (~{gb}GB)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantization Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(QUANTIZATION_FORMATS).map(([key, format]) => (
                    <SelectItem key={key} value={key}>
                      {format.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Size (GB)</label>
              <Input
                placeholder="Optional override"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                type="number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {calculations && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Size Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                Storage Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Original Size:</span>
                  <Badge variant="destructive">{calculations.baseSize.toFixed(1)} GB</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Quantized Size:</span>
                  <Badge variant="secondary">{calculations.quantizedSize.toFixed(1)} GB</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Storage Saved:</span>
                  <Badge variant="default">{calculations.memorySavings.toFixed(1)} GB</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Size Reduction</span>
                  <span>{calculations.savingsPercent.toFixed(1)}%</span>
                </div>
                <Progress value={calculations.savingsPercent} className="h-3" />
              </div>

              {ramValue && (
                <div className="mt-4">
                  {(() => {
                    const compat = getCompatibilityStatus(calculations.quantizedSize);
                    return (
                      <Alert className={
                        compat.status === 'excellent' ? 'border-green-200 bg-green-50' :
                        compat.status === 'good' ? 'border-blue-200 bg-blue-50' :
                        compat.status === 'tight' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{compat.message}</AlertDescription>
                      </Alert>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Performance Trade-offs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Model Quality</span>
                    <span>{calculations.format.quality}%</span>
                  </div>
                  <Progress value={calculations.format.quality} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Inference Speed</span>
                    <span>{calculations.format.speed}%</span>
                  </div>
                  <Progress value={calculations.format.speed} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Efficiency</span>
                    <span>{(100 / calculations.format.reduction).toFixed(0)}%</span>
                  </div>
                  <Progress value={100 / calculations.format.reduction} className="h-2" />
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Format Details:</h4>
                <ul className="text-xs space-y-1 text-gray-600">
                  {selectedFormat === 'fp16' && (
                    <>
                      <li>• Full precision, maximum quality</li>
                      <li>• Largest file size</li>
                      <li>• Best for fine-tuning</li>
                    </>
                  )}
                  {selectedFormat === 'int8' && (
                    <>
                      <li>• 50% smaller than FP16</li>
                      <li>• Minimal quality loss</li>
                      <li>• Good balance of size/quality</li>
                    </>
                  )}
                  {selectedFormat === 'int4' && (
                    <>
                      <li>• 75% smaller than FP16</li>
                      <li>• Moderate quality impact</li>
                      <li>• Most popular choice</li>
                    </>
                  )}
                  {selectedFormat === 'int2' && (
                    <>
                      <li>• 87.5% smaller than FP16</li>
                      <li>• Significant quality loss</li>
                      <li>• Experimental format</li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Format Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Format Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Format</th>
                  <th className="text-left p-2">Size Reduction</th>
                  <th className="text-left p-2">Quality</th>
                  <th className="text-left p-2">Speed</th>
                  <th className="text-left p-2">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(QUANTIZATION_FORMATS).map(([key, format]) => (
                  <tr key={key} className={`border-b hover:bg-gray-50 ${selectedFormat === key ? 'bg-blue-50' : ''}`}>
                    <td className="p-2 font-medium">{format.name}</td>
                    <td className="p-2">
                      <Badge variant="outline">
                        {(100 * (1 - format.reduction)).toFixed(0)}%
                      </Badge>
                    </td>
                    <td className="p-2">{format.quality}%</td>
                    <td className="p-2">{format.speed}%</td>
                    <td className="p-2 text-xs text-gray-600">
                      {key === 'fp16' && 'Research, fine-tuning'}
                      {key === 'int8' && 'Production, balanced'}
                      {key === 'int4' && 'Consumer hardware'}
                      {key === 'int2' && 'Extreme constraints'}
                      {key === 'fp8' && 'New GPUs, experimental'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Download Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Quantization Tools & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tools" className="w-full">
            <TabsList>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="formats">Formats</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🦙 Ollama</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Automatically downloads quantized models
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    ollama pull llama2:7b-q4_0
                  </code>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🤗 Transformers</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    BitsAndBytes quantization
                  </p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">
                    load_in_8bit=True
                  </code>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📦 LM Studio</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    GUI with automatic quantization
                  </p>
                  <Button size="sm" variant="outline">Visit Website</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚡ llama.cpp</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    GGUF format for CPU inference
                  </p>
                  <Button size="sm" variant="outline">GitHub Repo</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="formats" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold">GGUF (Recommended)</h4>
                  <p className="text-sm">Universal format, CPU/GPU support, wide compatibility</p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold">GPTQ</h4>
                  <p className="text-sm">GPU-optimized, fast inference, 4-bit precision</p>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold">AWQ</h4>
                  <p className="text-sm">Advanced weight quantization, preserves important weights</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">✅ Best Practices</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Start with 4-bit for most use cases</li>
                    <li>• Test quality before committing</li>
                    <li>• Monitor inference speed</li>
                    <li>• Keep FP16 for fine-tuning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚠️ Considerations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lower precision = quality loss</li>
                    <li>• Some models quantize better</li>
                    <li>• GPU memory still matters</li>
                    <li>• Benchmark your specific use case</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
