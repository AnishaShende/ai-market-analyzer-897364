import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { marketService } from '@/services/market';
import { MarketFilters } from '@/types/market';
import { MarketTable } from '@/components/markets/MarketTable';
import { MarketFiltersPanel } from '@/components/markets/MarketFiltersPanel';
import { MarketSearch } from '@/components/markets/MarketSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const MarketsPage = () => {
  const [filters, setFilters] = useState<MarketFilters>({
    sortBy: 'rank',
    sortOrder: 'asc'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: markets, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['markets', filters],
    queryFn: () => marketService.getMarkets(filters),
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const filteredMarkets = markets?.filter(market => 
    !searchQuery || 
    market.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    market.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleFiltersChange = (newFilters: MarketFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'rank',
      sortOrder: 'asc'
    });
    setSearchQuery('');
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load markets data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Markets</h1>
            <p className="text-muted-foreground">
              Discover and analyze cryptocurrency markets
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <MarketSearch 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filter Markets</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <MarketFiltersPanel
                    filters={filters}
                    onChange={handleFiltersChange}
                    onClear={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {isLoading ? (
              'Loading markets...'
            ) : (
              `Showing ${filteredMarkets.length} markets`
            )}
          </div>
          
          {(filters.category || filters.minPrice || filters.maxPrice || searchQuery) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block lg:col-span-1">
          <MarketFiltersPanel
            filters={filters}
            onChange={handleFiltersChange}
            onClear={clearFilters}
          />
        </div>
        
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <MarketTable 
              markets={filteredMarkets}
              onSort={(sortBy, sortOrder) => {
                setFilters(prev => ({ ...prev, sortBy, sortOrder }));
              }}
              currentSort={{ 
                sortBy: filters.sortBy || 'rank', 
                sortOrder: filters.sortOrder || 'asc' 
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};