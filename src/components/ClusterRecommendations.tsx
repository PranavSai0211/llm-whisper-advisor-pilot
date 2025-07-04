
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Network, Cpu, Zap, Download, ExternalLink, Server, Users, Globe } from 'lucide-react';

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

export const ClusterRecommendations = ({ ramValue, deviceType }: ClusterRecommendationsProps) => {
  const [selectedClusterType, setSelectedClusterType] = useState<'local' | 'distributed' | 'cloud'>('local');

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

  if (!ramValue) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-500">
            <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your device RAM to see cluster recommendations</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cluster Overview */}
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

      {/* Cluster Type Tabs */}
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

      {/* Cluster Setup Tips */}
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
