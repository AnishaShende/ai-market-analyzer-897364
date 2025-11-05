import { Link } from 'react-router-dom';
import { TrendingMarket } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';
import { TrendingUp, ExternalLink } from 'lucide-react';

interface TrendingMarketsProps {
  data: TrendingMarket[];
}

export const TrendingMarkets = ({ data }: TrendingMarketsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <CardTitle>Top Gainers (24h)</CardTitle>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/markets">
            View All
            <ExternalLink className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((market, index) => (
            <Link
              key={market.id}
              to={`/markets/${market.symbol}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-4">
                    #{market.rank}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={market.image} alt={market.symbol} />
                    <AvatarFallback>
                      {market.symbol.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="font-medium">{market.symbol}</div>
                  <div className="text-sm text-muted-foreground">{market.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">{formatCurrency(market.price)}</div>
                <div className={`text-sm ${getChangeColor(market.changePercent24h)}`}>
                  {formatPercentage(market.changePercent24h)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No trending markets data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};