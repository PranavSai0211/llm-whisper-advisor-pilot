
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Play, Pause, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface DownloadItem {
  id: string;
  modelName: string;
  size: string;
  progress: number;
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'error';
  speed?: string;
  eta?: string;
}

export const DownloadManager = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: '1',
      modelName: 'Llama 3.1 8B (Q4_K_M)',
      size: '4.7GB',
      progress: 65,
      status: 'downloading',
      speed: '2.3 MB/s',
      eta: '8 min'
    },
    {
      id: '2',
      modelName: 'Mistral 7B (Q5_K_M)',
      size: '5.1GB',
      progress: 100,
      status: 'completed'
    },
    {
      id: '3',
      modelName: 'Phi-3 Mini (Q4_K_M)',
      size: '2.3GB',
      progress: 0,
      status: 'pending'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'downloading':
        return <Download className="h-4 w-4 text-blue-600 animate-bounce" />;
      default:
        return <Download className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'downloading':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const pauseDownload = (id: string) => {
    setDownloads(downloads.map(d => 
      d.id === id ? { ...d, status: 'paused' as const } : d
    ));
  };

  const resumeDownload = (id: string) => {
    setDownloads(downloads.map(d => 
      d.id === id ? { ...d, status: 'downloading' as const } : d
    ));
  };

  const removeDownload = (id: string) => {
    setDownloads(downloads.filter(d => d.id !== id));
  };

  const totalDownloads = downloads.length;
  const completedDownloads = downloads.filter(d => d.status === 'completed').length;
  const activeDownloads = downloads.filter(d => d.status === 'downloading').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Download Manager
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{completedDownloads}/{totalDownloads} Complete</Badge>
            <Badge variant="outline">{activeDownloads} Active</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {downloads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No downloads yet. Start downloading models to see them here.</p>
          </div>
        ) : (
          downloads.map((download) => (
            <div key={download.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(download.status)}
                  <div>
                    <h4 className="font-medium">{download.modelName}</h4>
                    <p className="text-sm text-gray-500">{download.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(download.status)} text-white`}
                  >
                    {download.status}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    {download.status === 'downloading' && (
                      <Button size="sm" variant="ghost" onClick={() => pauseDownload(download.id)}>
                        <Pause className="h-3 w-3" />
                      </Button>
                    )}
                    
                    {download.status === 'paused' && (
                      <Button size="sm" variant="ghost" onClick={() => resumeDownload(download.id)}>
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeDownload(download.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={download.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{download.progress}% complete</span>
                  {download.speed && download.eta && (
                    <span>{download.speed} • {download.eta} remaining</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        <div className="pt-4 border-t">
          <Button className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Add New Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
