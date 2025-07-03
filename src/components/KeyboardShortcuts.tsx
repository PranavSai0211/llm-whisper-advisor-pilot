import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Keyboard, Command } from 'lucide-react';

const shortcuts = [
  { key: '1-5', action: 'Switch between tabs' },
  { key: '/', action: 'Focus RAM input' },
  { key: 'D', action: 'Toggle device type' },
  { key: 'T', action: 'Toggle dark mode' },
  { key: 'R', action: 'Reset all inputs' },
];

export const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts panel
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setIsVisible(true);
        return;
      }

      // Hide if visible and escape pressed
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
        return;
      }

      // Other shortcuts
      if (e.key === '/') {
        e.preventDefault();
        const ramInput = document.querySelector('input[placeholder*="8GB"]') as HTMLInputElement;
        ramInput?.focus();
      }

      if (e.key === 't' && e.altKey) {
        e.preventDefault();
        const darkModeButton = document.querySelector('[data-testid="dark-mode-toggle"]') as HTMLButtonElement;
        darkModeButton?.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Badge variant="outline" className="text-xs opacity-60 hover:opacity-100 cursor-pointer"
               onClick={() => setIsVisible(true)}>
          Press ? for shortcuts
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         onClick={() => setIsVisible(false)}>
      <Card className="w-96" onClick={e => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            Keyboard Shortcuts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{shortcut.action}</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {shortcut.key}
                </Badge>
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show this panel</span>
                <Badge variant="secondary" className="font-mono text-xs">?</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
