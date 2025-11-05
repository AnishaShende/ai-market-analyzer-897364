import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { marketService } from '@/services/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';
import { TrendingUp } from 'lucide-react';

interface RelatedMarketsProps {
  currentSymbol: string;
}

export const RelatedMarkets = ({ currentSymbol }: RelatedMarketsProps) => {
  const { data: markets, isLoading } = useQuery({
    queryKey: ['markets-related', currentSymbol],
    queryFn: () => marketService.getMarkets({ sortBy: 'marketCap', sortOrder: 'desc' }),
    select: (data) => data.filter(m => m.symbol !== currentSymbol.toUpperCase()).slice(0, 5)
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <CardTitle>Related Markets</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {markets?.map((market) => (
              <Link
                key={market.id}
                to={`/markets/${market.symbol}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={market.image} alt={market.symbol} />
                    <AvatarFallback className="text-xs">
                      {market.symbol.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{market.symbol}</div>
                    <div className="text-xs text-muted-foreground">#{market.rank}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {formatCurrency(market.price)}
                  </div>
                  <div className={`text-xs ${getChangeColor(market.changePercent24h)}`}>
                    {formatPercentage(market.changePercent24h)}
                  </div>
                </div>
              </Link>
            )) || []}
          </div>
        )}
        
        {!isLoading && (!markets || markets.length === 0) && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No related markets available
          </div>
        )}
      </CardContent>
    </Card>
  );
};