import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Network, Cpu, Zap, Download, ExternalLink, Server, Users, Globe, Plus, Trash2, Upload, Calculator, GraduationCap, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ClusterRecommendationsProps {
  ramValue: number | null;
  deviceType: 'laptop' | 'mobile';
}

interface ClusterSetup {
  name: string;
  description: string;
  minNodes: number;
  maxNodes: number;
  totalRam: string;
  performance: number;
  complexity: 'Easy' | 'Medium' | 'Hard';
  models: string[];
  useCase: string;
  icon: string;
}

interface DeviceSpec {
  id: string;
  name: string;
  ram: number;
  deviceType: 'laptop' | 'mobile';
  os: string;
  quantity: number;
}

interface BulkClusterForm {
  clusterName: string;
  clusterType: 'educational' | 'corporate' | 'research';
  totalUsers: number;
  deviceSpecs: string; // CSV format or JSON
}

export const ClusterRecommendations = ({ ramValue, deviceType }: ClusterRecommendationsProps) => {
  const [selectedClusterType, setSelectedClusterType] = useState<'local' | 'distributed' | 'cloud'>('local');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [deviceList, setDeviceList] = useState<DeviceSpec[]>([]);
  const [bulkRecommendations, setBulkRecommendations] = useState<any>(null);

  const form = useForm<BulkClusterForm>({
    defaultValues: {
      clusterName: '',
      clusterType: 'educational',
      totalUsers: 0,
      deviceSpecs: ''
    }
  });

  const addDevice = () => {
    const newDevice: DeviceSpec = {
      id: Date.now().toString(),
      name: `Device ${deviceList.length + 1}`,
      ram: 8,
      deviceType: 'laptop',
      os: 'Windows 11',
      quantity: 1
    };
    setDeviceList([...deviceList, newDevice]);
  };

  const removeDevice = (id: string) => {
    setDeviceList(deviceList.filter(device => device.id !== id));
  };

  const updateDevice = (id: string, updates: Partial<DeviceSpec>) => {
    setDeviceList(deviceList.map(device => 
      device.id === id ? { ...device, ...updates } : device
    ));
  };

  const calculateBulkRecommendations = () => {
    if (deviceList.length === 0) return;

    const totalDevices = deviceList.reduce((sum, device) => sum + device.quantity, 0);
    const totalRam = deviceList.reduce((sum, device) => sum + (device.ram * device.quantity), 0);
    const avgRam = totalRam / totalDevices;
    const laptopCount = deviceList.filter(d => d.deviceType === 'laptop').reduce((sum, d) => sum + d.quantity, 0);
    const mobileCount = totalDevices - laptopCount;

    const recommendations = {
      totalDevices,
      totalRam,
      avgRam,
      laptopCount,
      mobileCount,
      recommendedSetup: getBulkClusterSetup(totalRam, totalDevices, avgRam),
      modelRecommendations: getBulkModelRecommendations(avgRam, totalDevices),
      costEstimate: calculateCostEstimate(totalRam, totalDevices)
    };

    setBulkRecommendations(recommendations);
  };

  const getBulkClusterSetup = (totalRam: number, deviceCount: number, avgRam: number) => {
    if (avgRam >= 32) {
      return {
        type: 'High-Performance Educational Cluster',
        description: 'Capable of running large models with multiple concurrent users',
        architecture: 'Distributed with dedicated server nodes',
        scalability: 'Excellent',
        models: ['Llama 3.1 70B', 'Mixtral 8x22B', 'Claude-3 Haiku', 'GPT-4 equivalent models']
      };
    } else if (avgRam >= 16) {
      return {
        type: 'Standard Educational Cluster',
        description: 'Balanced performance for classroom and research activities',
        architecture: 'Hybrid local-cloud deployment',
        scalability: 'Good',
        models: ['Llama 3.1 8B', 'Mistral 7B', 'CodeLlama 13B', 'Phi-3 Medium']
      };
    } else {
      return {
        type: 'Basic Educational Cluster',
        description: 'Entry-level setup for learning and basic AI tasks',
        architecture: 'Local deployment with cloud backup',
        scalability: 'Limited',
        models: ['Phi-3 Mini', 'TinyLlama 1.1B', 'Llama 3.1 8B (quantized)', 'Gemma 2B']
      };
    }
  };

  const getBulkModelRecommendations = (avgRam: number, deviceCount: number) => {
    const concurrent = Math.min(deviceCount, Math.floor(deviceCount / 4)); // Concurrent users estimate
    
    return {
      primaryModel: avgRam >= 16 ? 'Llama 3.1 8B' : 'Phi-3 Mini',
      concurrentUsers: concurrent,
      loadBalancing: deviceCount > 20 ? 'Required' : 'Recommended',
      redundancy: deviceCount > 50 ? 'High Availability Setup' : 'Standard Setup',
      specializedModels: {
        coding: ['CodeLlama 7B', 'StarCoder2 3B'],
        math: ['MathCoder 7B', 'WizardMath 7B'],
        general: ['Mistral 7B', 'Llama 3.1 8B']
      }
    };
  };

  const calculateCostEstimate = (totalRam: number, deviceCount: number) => {
    const serverCost = Math.ceil(totalRam / 64) * 500; // $500 per 64GB server node
    const networkingCost = deviceCount > 50 ? 2000 : deviceCount > 20 ? 1000 : 500;
    const softwareCost = deviceCount * 10; // $10 per device for software
    const maintenanceCost = (serverCost + networkingCost) * 0.2; // 20% annual maintenance

    return {
      initial: serverCost + networkingCost + softwareCost,
      annual: maintenanceCost,
      perDevice: Math.round((serverCost + networkingCost + softwareCost) / deviceCount)
    };
  };

  const parseBulkDeviceSpecs = (csvData: string) => {
    try {
      const lines = csvData.trim().split('\n');
      const devices: DeviceSpec[] = [];
      
      lines.forEach((line, index) => {
        if (index === 0) return; // Skip header
        const [name, ram, deviceType, os, quantity] = line.split(',');
        devices.push({
          id: `bulk-${index}`,
          name: name?.trim() || `Device ${index}`,
          ram: parseInt(ram?.trim()) || 8,
          deviceType: (deviceType?.trim() as 'laptop' | 'mobile') || 'laptop',
          os: os?.trim() || 'Windows 11',
          quantity: parseInt(quantity?.trim()) || 1
        });
      });
      
      setDeviceList(devices);
    } catch (error) {
      console.error('Error parsing CSV data:', error);
    }
  };

  const getClusterRecommendations = (ram: number | null): ClusterSetup[] => {
    if (!ram) return [];

    const clusters: ClusterSetup[] = [
      {
        name: 'Personal AI Cluster',
        description: 'Run multiple smaller models simultaneously for different tasks',
        minNodes: 2,
        maxNodes: 4,
        totalRam: `${ram * 2}-${ram * 4}GB`,
        performance: 75,
        complexity: 'Easy',
        models: ['Phi-3 Mini', 'Llama 3.1 8B', 'CodeLlama 7B'],
        useCase: 'Multi-tasking, Development, Personal Assistant',
        icon: '🏠'
      },
      {
        name: 'Inference Farm',
        description: 'High-throughput model serving with load balancing',
        minNodes: 3,
        maxNodes: 8,
        totalRam: `${ram * 3}-${ram * 8}GB`,
        performance: 90,
        complexity: 'Medium',
        models: ['Mistral 7B', 'Llama 3.1 70B', 'Mixtral 8x7B'],
        useCase: 'API Services, Multiple Users, Production Apps',
        icon: '⚡'
      },
      {
        name: 'Research Cluster',
        description: 'Large model training and fine-tuning capabilities',
        minNodes: 4,
        maxNodes: 16,
        totalRam: `${ram * 4}-${ram * 16}GB`,
        performance: 95,
        complexity: 'Hard',
        models: ['Llama 3.1 405B', 'Custom Fine-tuned Models', 'Multi-modal Models'],
        useCase: 'Research, Training, Large-scale Inference',
        icon: '🔬'
      }
    ];

    return clusters.filter(cluster => ram >= 8 || cluster.complexity === 'Easy');
  };

  const clusterRecommendations = getClusterRecommendations(ramValue);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const clusterTypes = {
    local: {
      title: 'Local Clusters',
      icon: <Server className="h-5 w-5" />,
      description: 'Deploy across your local network devices'
    },
    distributed: {
      title: 'Distributed Setup',
      icon: <Network className="h-5 w-5" />,
      description: 'Coordinate multiple remote machines'
    },
    cloud: {
      title: 'Cloud Deployment',
      icon: <Globe className="h-5 w-5" />,
      description: 'Scale with cloud infrastructure'
    }
  };

  if (!ramValue && deviceList.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your device RAM or configure bulk devices to see cluster recommendations</p>
            <Button 
              onClick={() => setShowBulkInput(true)} 
              className="mt-4"
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              Configure Multiple Devices
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bulk Device Configuration */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              Bulk Device Management
            </div>
            <Button
              onClick={() => setShowBulkInput(!showBulkInput)}
              variant="outline"
              size="sm"
            >
              {showBulkInput ? 'Hide' : 'Show'} Bulk Input
            </Button>
          </CardTitle>
        </CardHeader>
        {showBulkInput && (
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device List Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Device Specifications</h4>
                  <Button onClick={addDevice} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {deviceList.map((device) => (
                    <Card key={device.id} className="p-4 border border-gray-200">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Device name"
                          value={device.name}
                          onChange={(e) => updateDevice(device.id, { name: e.target.value })}
                          className="text-sm"
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="RAM (GB)"
                            value={device.ram}
                            onChange={(e) => updateDevice(device.id, { ram: parseInt(e.target.value) || 8 })}
                            className="text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={device.quantity}
                            onChange={(e) => updateDevice(device.id, { quantity: parseInt(e.target.value) || 1 })}
                            className="text-sm w-20"
                          />
                          <Button
                            onClick={() => removeDevice(device.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Bulk Import (CSV)</h5>
                  <Textarea
                    placeholder="Name,RAM(GB),Type,OS,Quantity
Student Laptop 1,16,laptop,Windows 11,50
Mobile Device 1,8,mobile,Android 13,30"
                    className="text-sm font-mono"
                    rows={4}
                    onChange={(e) => {
                      if (e.target.value.trim()) {
                        parseBulkDeviceSpecs(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Bulk Analysis */}
              <div className="space-y-4">
                <h4 className="font-semibold">Cluster Analysis</h4>
                <Button 
                  onClick={calculateBulkRecommendations}
                  className="w-full"
                  disabled={deviceList.length === 0}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Analyze Cluster Requirements
                </Button>

                {bulkRecommendations && (
                  <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Total Devices</div>
                        <div className="text-2xl font-bold text-blue-600">{bulkRecommendations.totalDevices}</div>
                      </div>
                      <div>
                        <div className="font-medium">Total RAM</div>
                        <div className="text-2xl font-bold text-purple-600">{bulkRecommendations.totalRam}GB</div>
                      </div>
                      <div>
                        <div className="font-medium">Average RAM</div>
                        <div className="text-lg font-semibold">{Math.round(bulkRecommendations.avgRam)}GB</div>
                      </div>
                      <div>
                        <div className="font-medium">Device Mix</div>
                        <div className="text-lg font-semibold">{bulkRecommendations.laptopCount}L / {bulkRecommendations.mobileCount}M</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-purple-700 dark:text-purple-300">Recommended Setup</h5>
                      <div className="text-sm space-y-2">
                        <div><strong>Type:</strong> {bulkRecommendations.recommendedSetup.type}</div>
                        <div><strong>Architecture:</strong> {bulkRecommendations.recommendedSetup.architecture}</div>
                        <div><strong>Scalability:</strong> {bulkRecommendations.recommendedSetup.scalability}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-300">Cost Estimate</h5>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="font-medium">Initial</div>
                          <div className="text-lg font-bold">${bulkRecommendations.costEstimate.initial.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="font-medium">Annual</div>
                          <div className="text-lg font-bold">${bulkRecommendations.costEstimate.annual.toLocaleString()}</div>
                        </div>
                        <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="font-medium">Per Device</div>
                          <div className="text-lg font-bold">${bulkRecommendations.costEstimate.perDevice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Educational Cluster Templates */}
      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900 dark:to-cyan-900">
          <CardTitle className="flex items-center">
            <GraduationCap className="h-6 w-6 mr-2 text-emerald-600" />
            Educational Cluster Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-semibold mb-2">Classroom (30 Students)</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• 30 laptops @ 16GB each</div>
                  <div>• Llama 3.1 8B + Phi-3 Mini</div>
                  <div>• Cost: ~$15,000 initial</div>
                </div>
                <Button size="sm" className="mt-3 w-full" variant="outline">
                  Apply Template
                </Button>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-cyan-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🏫</div>
                <h4 className="font-semibold mb-2">School (100 Students)</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Mixed devices (70L + 30M)</div>
                  <div>• Distributed cluster setup</div>
                  <div>• Cost: ~$45,000 initial</div>
                </div>
                <Button size="sm" className="mt-3 w-full" variant="outline">
                  Apply Template
                </Button>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <div className="text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h4 className="font-semibold mb-2">University (500+ Students)</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Enterprise-grade cluster</div>
                  <div>• Multiple model types</div>
                  <div>• Cost: ~$200,000+ initial</div>
                </div>
                <Button size="sm" className="mt-3 w-full" variant="outline">
                  Apply Template
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {ramValue && (
        <>
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Network className="h-6 w-6 mr-2 text-purple-600" />
                  LLM Cluster Recommendations
                </div>
                <Badge variant="outline" className="bg-purple-100 border-purple-300">
                  {ramValue}GB Base Node
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {clusterRecommendations.length}
                  </div>
                  <div className="text-sm text-gray-600">Available Setups</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {Math.max(2, Math.floor(ramValue / 4))}x
                  </div>
                  <div className="text-sm text-gray-600">Performance Boost</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">
                    {ramValue >= 16 ? '✅' : '⚠️'}
                  </div>
                  <div className="text-sm text-gray-600">Production Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={selectedClusterType} onValueChange={(value: 'local' | 'distributed' | 'cloud') => setSelectedClusterType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(clusterTypes).map(([key, type]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  {type.icon}
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(clusterTypes).map(([key, type]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {type.icon}
                      <span className="ml-2">{type.title}</span>
                    </CardTitle>
                    <p className="text-gray-600">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {clusterRecommendations.map((cluster, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <span className="text-2xl mr-3">{cluster.icon}</span>
                                <div>
                                  <h4 className="font-semibold text-lg">{cluster.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{cluster.description}</p>
                                </div>
                              </div>
                              <Badge className={getComplexityColor(cluster.complexity)} variant="outline">
                                {cluster.complexity}
                              </Badge>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <Users className="h-3 w-3 mr-1 text-gray-500" />
                                    <span className="font-medium">Nodes:</span>
                                  </div>
                                  <span>{cluster.minNodes}-{cluster.maxNodes}</span>
                                </div>
                                <div>
                                  <div className="flex items-center mb-1">
                                    <Cpu className="h-3 w-3 mr-1 text-gray-500" />
                                    <span className="font-medium">Total RAM:</span>
                                  </div>
                                  <span>{cluster.totalRam}</span>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="font-medium">Performance Score</span>
                                  <span>{cluster.performance}%</span>
                                </div>
                                <Progress value={cluster.performance} className="h-2" />
                              </div>

                              <div>
                                <h5 className="font-medium text-sm mb-2">Recommended Models:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {cluster.models.map((model, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {model}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-2 border-t">
                                <div className="text-sm text-gray-600 mb-3">
                                  <strong>Use Case:</strong> {cluster.useCase}
                                </div>
                                <div className="flex gap-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button size="sm" variant="outline" className="flex-1">
                                        <Download className="h-3 w-3 mr-1" />
                                        Setup Guide
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Download configuration files and setup instructions</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Documentation
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {clusterRecommendations.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Upgrade to 8GB+ RAM to unlock cluster capabilities</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Cluster Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-600">🚀 Performance Tips</h4>
              <ul className="space-y-2 text-sm">
                <li>• Use dedicated network for inter-node communication</li>
                <li>• Balance CPU and memory across nodes</li>
                <li>• Implement proper load balancing strategies</li>
                <li>• Monitor resource usage and bottlenecks</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-emerald-600">🛠️ Setup Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li>• Start with 2-3 nodes for testing</li>
                <li>• Use containerization (Docker/Kubernetes)</li>
                <li>• Implement health monitoring and failover</li>
                <li>• Plan for horizontal scaling needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
