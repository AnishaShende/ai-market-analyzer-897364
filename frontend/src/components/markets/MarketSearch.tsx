import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MarketSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MarketSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search markets..." 
}: MarketSearchProps) => {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};