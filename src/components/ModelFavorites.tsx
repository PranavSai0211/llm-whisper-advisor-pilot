
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Download, ExternalLink, Trash2 } from 'lucide-react';

interface FavoriteModel {
  id: string;
  name: string;
  size: string;
  description: string;
  category: string;
  addedDate: string;
  rating: number;
}

export const ModelFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteModel[]>([
    {
      id: '1',
      name: 'Llama 3.1 8B',
      size: '4.7GB',
      description: 'Excellent general-purpose model with strong reasoning capabilities',
      category: 'General',
      addedDate: '2024-01-15',
      rating: 5
    },
    {
      id: '2',
      name: 'Phi-3 Mini',
      size: '2.3GB',
      description: 'Perfect for mobile and edge deployment scenarios',
      category: 'Mobile',
      addedDate: '2024-01-10',
      rating: 4
    },
    {
      id: '3',
      name: 'CodeLlama 7B',
      size: '3.8GB',
      description: 'Specialized coding assistant with excellent Python support',
      category: 'Code',
      addedDate: '2024-01-08',
      rating: 5
    }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'General': 'bg-blue-100 text-blue-800',
      'Code': 'bg-purple-100 text-purple-800',
      'Mobile': 'bg-green-100 text-green-800',
      'Chat': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500 fill-current" />
            Your Favorite Models
          </div>
          <Badge variant="secondary">{favorites.length} saved</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No favorite models yet. Heart models you like to save them here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((model) => (
              <div key={model.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{model.name}</h4>
                      <Badge className={getCategoryColor(model.category)} variant="secondary">
                        {model.category}
                      </Badge>
                      <Badge variant="outline">{model.size}</Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{model.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        {renderStars(model.rating)}
                      </div>
                      <span>Added {new Date(model.addedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(model.id)}
                    className="text-red-600 hover:text-red-700 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 pt-2 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {favorites.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full">
              Export Favorites List
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
