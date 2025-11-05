import { MarketDetail, AIInsight } from '@/types/market';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  formatCurrency, 
  formatPercentage, 
  formatRelativeTime,
  getChangeColor 
} from '@/utils/formatters';
import { TrendingUp, TrendingDown, Clock, Bot } from 'lucide-react';

interface PriceHeaderProps {
  market: MarketDetail;
  insights?: AIInsight[];
}

export const PriceHeader = ({ market, insights }: PriceHeaderProps) => {
  const latestInsight = insights?.[0];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={market.image} alt={market.symbol} />
              <AvatarFallback className="text-lg">
                {market.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{market.name}</h1>
                <Badge variant="secondary">{market.symbol}</Badge>
                <Badge variant="outline" className="text-xs">
                  Rank #{market.rank}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated {formatRelativeTime(market.lastUpdated)}
                </div>
                {market.website && (
                  <a 
                    href={market.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(market.price)}
            </div>
            
            <div className={`flex items-center justify-end gap-2 ${getChangeColor(market.changePercent24h)}`}>
              {market.changePercent24h > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-medium">
                {formatPercentage(market.changePercent24h)}
              </span>
              <span className="text-sm">
                ({formatCurrency(market.change24h)})
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground mt-1">
              24h Range: {formatCurrency(market.low24h)} - {formatCurrency(market.high24h)}
            </div>
          </div>
        </div>
        
        {latestInsight && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Latest AI Insight</span>
              <Badge 
                variant={latestInsight.type === 'bullish' ? 'default' : 
                        latestInsight.type === 'bearish' ? 'destructive' : 'secondary'}
                className="text-xs capitalize"
              >
                {latestInsight.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {(latestInsight.confidence * 100).toFixed(0)}% confidence
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {latestInsight.title}: {latestInsight.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};