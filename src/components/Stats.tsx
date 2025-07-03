
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Download, Zap } from 'lucide-react';

export const Stats = () => {
  const stats = [
    {
      icon: <Download className="h-6 w-6" />,
      value: '150+',
      label: 'AI Models',
      description: 'Curated collection'
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: '1M+',
      label: 'Downloads',
      description: 'Community driven'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: '75%',
      label: 'Memory Saved',
      description: 'With quantization'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: '99%',
      label: 'Compatibility',
      description: 'Modern devices'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-center mb-3 text-blue-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{stat.label}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
