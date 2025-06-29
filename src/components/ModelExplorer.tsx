
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Download, Star, GitFork, Calendar } from 'lucide-react';
import { LLM_DATABASE, PERFORMANCE_TIERS } from '@/utils/llmData';

interface ModelExplorerProps {
  selectedTier: string;
  selectedCategory: string;
  onTierChange: (tier: string) => void;
  onCategoryChange: (category: string) => void;
}

export const ModelExplorer = ({ 
  selectedTier, 
  selectedCategory, 
  onTierChange, 
  onCategoryChange 
}: ModelExplorerProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const getModelsForDisplay = () => {
    let allModels: any[] = [];
    
    Object.entries(LLM_DATABASE).forEach(([tierKey, tierData]) => {
      Object.entries(tierData).forEach(([category, models]) => {
        models.forEach((model: any) => {
          allModels.push({
            ...model,
            tier: tierKey,
            category,
            tierName: PERFORMANCE_TIERS[tierKey as keyof typeof PERFORMANCE_TIERS]?.name || tierKey
          });
        });
      });
    });

    // Filter by tier
    if (selectedTier !== 'all') {
      allModels = allModels.filter(model => model.tier === selectedTier);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      allModels = allModels.filter(model => model.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      allModels = allModels.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allModels;
  };

  const displayModels = getModelsForDisplay();
  const categories = ['all', 'general', 'code', 'chat', 'reasoning', 'multimodal'];
  const tiers = ['all', ...Object.keys(PERFORMANCE_TIERS)];

  const getModelIcon = (name: string) => {
    if (name.includes('Llama')) return '🦙';
    if (name.includes('Mistral')) return '🌪️';
    if (name.includes('Gemma')) return '💎';
    if (name.includes('Phi')) return '🔷';
    if (name.includes('Code')) return '💻';
    if (name.includes('Chat') || name.includes('Vicuna')) return '💬';
    if (name.includes('Math') || name.includes('Wizard')) return '🧮';
    return '🤖';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'code': return 'bg-green-100 text-green-800';
      case 'chat': return 'bg-purple-100 text-purple-800';
      case 'reasoning': return 'bg-orange-100 text-orange-800';
      case 'multimodal': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPopularityScore = (name: string) => {
    // Simulate popularity based on common models
    const popularModels = ['Llama-2', 'Mistral', 'Gemma', 'Phi', 'CodeLlama', 'Vicuna'];
    return popularModels.some(model => name.includes(model)) ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 3) + 1;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Model Explorer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Models</label>
              <Input
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Performance Tier</label>
              <Select value={selectedTier} onValueChange={onTierChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  {Object.entries(PERFORMANCE_TIERS).map(([key, tier]) => (
                    <SelectItem key={key} value={key}>
                      {tier.name} ({tier.ramRange})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  onTierChange('all');
                  onCategoryChange('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {displayModels.length} models</span>
            <div className="flex gap-2">
              <Badge variant="secondary">🦙 Llama Family</Badge>
              <Badge variant="secondary">🌪️ Mistral</Badge>
              <Badge variant="secondary">💎 Gemma</Badge>
              <Badge variant="secondary">🔷 Phi</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayModels.map((model, index) => {
          const popularity = getPopularityScore(model.name);
          
          return (
            <Card key={`${model.name}-${index}`} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg flex items-center">
                      <span className="mr-2">{getModelIcon(model.name)}</span>
                      {model.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {model.size}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(model.category)}>
                      {model.category}
                    </Badge>
                    <Badge variant="secondary">
                      {model.tierName}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{popularity}/5</span>
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-3 w-3 mr-1" />
                      <span>{Math.floor(Math.random() * 1000) + 100}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>2024</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs">
                      <div className="font-medium mb-1">Quantization Options:</div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs bg-red-50">
                          FP16: {model.size}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-yellow-50">
                          8bit: {(parseFloat(model.size) * 0.5).toFixed(1)}GB
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-green-50">
                          4bit: {(parseFloat(model.size) * 0.25).toFixed(1)}GB
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      HF Hub
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ollama
                    </Button>
                  </div>

                  {/* Model highlights */}
                  <div className="text-xs space-y-1">
                    {model.name.includes('Instruct') && (
                      <div className="flex items-center text-blue-600">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Instruction-tuned
                      </div>
                    )}
                    {model.name.includes('Chat') && (
                      <div className="flex items-center text-purple-600">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        Chat-optimized
                      </div>
                    )}
                    {model.name.includes('Code') && (
                      <div className="flex items-center text-green-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Code specialist
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayModels.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No models found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Models Section */}
      <Card>
        <CardHeader>
          <CardTitle>🌟 Most Popular Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Llama-2-7B-Chat', category: 'chat', downloads: '10M+' },
              { name: 'Mistral-7B-Instruct', category: 'general', downloads: '5M+' },
              { name: 'CodeLlama-7B', category: 'code', downloads: '3M+' },
              { name: 'Vicuna-13B', category: 'chat', downloads: '2M+' }
            ].map((model, index) => (
              <div key={index} className="p-3 border rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{getModelIcon(model.name)}</div>
                <div className="font-semibold text-sm">{model.name}</div>
                <div className="text-xs text-gray-600 capitalize">{model.category}</div>
                <Badge variant="secondary" className="text-xs mt-2">
                  {model.downloads}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
