import { Link } from 'react-router-dom';
import { Market, MarketFilters } from '@/types/market';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercentage, 
  getChangeColor 
} from '@/utils/formatters';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface MarketTableProps {
  markets: Market[];
  onSort: (sortBy: NonNullable<MarketFilters['sortBy']>, sortOrder: 'asc' | 'desc') => void;
  currentSort: {
    sortBy: NonNullable<MarketFilters['sortBy']>;
    sortOrder: 'asc' | 'desc';
  };
}

interface SortableHeaderProps {
  children: React.ReactNode;
  sortKey: NonNullable<MarketFilters['sortBy']>;
  currentSort: MarketTableProps['currentSort'];
  onSort: MarketTableProps['onSort'];
  className?: string;
}

const SortableHeader = ({ children, sortKey, currentSort, onSort, className }: SortableHeaderProps) => {
  const isActive = currentSort.sortBy === sortKey;
  const nextOrder = isActive && currentSort.sortOrder === 'asc' ? 'desc' : 'asc';

  return (
    <Button
      variant="ghost"
      onClick={() => onSort(sortKey, nextOrder)}
      className={`h-auto p-0 font-medium text-left justify-start hover:bg-transparent ${className}`}
    >
      {children}
      {isActive && (
        currentSort.sortOrder === 'asc' ? 
          <ChevronUp className="ml-1 h-3 w-3" /> : 
          <ChevronDown className="ml-1 h-3 w-3" />
      )}
    </Button>
  );
};

export const MarketTable = ({ markets, onSort, currentSort }: MarketTableProps) => {
  if (markets.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No markets found matching your criteria</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <SortableHeader 
                  sortKey="rank" 
                  currentSort={currentSort} 
                  onSort={onSort}
                >
                  #
                </SortableHeader>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">
                <SortableHeader 
                  sortKey="price" 
                  currentSort={currentSort} 
                  onSort={onSort}
                  className="w-full justify-end"
                >
                  Price
                </SortableHeader>
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader 
                  sortKey="change24h" 
                  currentSort={currentSort} 
                  onSort={onSort}
                  className="w-full justify-end"
                >
                  24h Change
                </SortableHeader>
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader 
                  sortKey="volume24h" 
                  currentSort={currentSort} 
                  onSort={onSort}
                  className="w-full justify-end"
                >
                  24h Volume
                </SortableHeader>
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader 
                  sortKey="marketCap" 
                  currentSort={currentSort} 
                  onSort={onSort}
                  className="w-full justify-end"
                >
                  Market Cap
                </SortableHeader>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markets.map((market) => (
              <TableRow key={market.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-muted-foreground">
                  #{market.rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={market.image} alt={market.symbol} />
                      <AvatarFallback className="text-xs">
                        {market.symbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{market.symbol}</div>
                      <div className="text-sm text-muted-foreground">{market.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(market.price)}
                </TableCell>
                <TableCell className="text-right">
                  <div className={getChangeColor(market.changePercent24h)}>
                    <div className="font-medium">
                      {formatPercentage(market.changePercent24h)}
                    </div>
                    <div className="text-sm">
                      {formatCurrency(market.change24h)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatLargeNumber(market.volume24h)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatLargeNumber(market.marketCap)}
                </TableCell>
                <TableCell>
                  <Link to={`/markets/${market.symbol}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};