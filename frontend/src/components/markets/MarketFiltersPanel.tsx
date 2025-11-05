import { useState } from 'react';
import { MarketFilters } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface MarketFiltersPanelProps {
  filters: MarketFilters;
  onChange: (filters: MarketFilters) => void;
  onClear: () => void;
}

const categories = [
  { value: 'cryptocurrency', label: 'Cryptocurrency' },
  { value: 'defi', label: 'DeFi' },
  { value: 'nft', label: 'NFT' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'metaverse', label: 'Metaverse' },
];

const sortOptions = [
  { value: 'rank', label: 'Market Cap Rank' },
  { value: 'price', label: 'Price' },
  { value: 'change24h', label: '24h Change' },
  { value: 'volume24h', label: '24h Volume' },
  { value: 'marketCap', label: 'Market Cap' },
];

export const MarketFiltersPanel = ({ filters, onChange, onClear }: MarketFiltersPanelProps) => {
  const [localFilters, setLocalFilters] = useState<MarketFilters>(filters);

  const applyFilters = () => {
    onChange(localFilters);
  };

  const updateFilter = (key: keyof MarketFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  const removeFilter = (key: keyof MarketFilters) => {
    const newFilters = { ...localFilters };
    delete newFilters[key];
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  const activeFiltersCount = Object.keys(filters).filter(key => 
    key !== 'sortBy' && 
    key !== 'sortOrder' && 
    filters[key as keyof MarketFilters] !== undefined
  ).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} className="text-xs">
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category || ''}
            onValueChange={(value) => updateFilter('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.category && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFilter('category')}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              {categories.find(c => c.value === filters.category)?.label}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Min price"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          {(filters.minPrice || filters.maxPrice) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                removeFilter('minPrice');
                removeFilter('maxPrice');
              }}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Price range
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label>Volume Range (24h)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Min volume"
                value={filters.minVolume || ''}
                onChange={(e) => updateFilter('minVolume', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max volume"
                value={filters.maxVolume || ''}
                onChange={(e) => updateFilter('maxVolume', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          {(filters.minVolume || filters.maxVolume) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                removeFilter('minVolume');
                removeFilter('maxVolume');
              }}
              className="h-6 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Volume range
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            value={filters.sortBy || 'rank'}
            onValueChange={(value) => updateFilter('sortBy', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Select
            value={filters.sortOrder || 'asc'}
            onValueChange={(value) => updateFilter('sortOrder', value as 'asc' | 'desc')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};