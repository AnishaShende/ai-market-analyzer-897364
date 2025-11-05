import { PortfolioSummary as PortfolioData } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency, formatPercentage, getChangeColor } from '@/utils/formatters';
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioSummaryProps {
  data: PortfolioData;
}

export const PortfolioSummary = ({ data }: PortfolioSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          <CardTitle>Portfolio</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <span className="text-xl font-bold">{formatCurrency(data.totalValue)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total P&L</span>
            <span className={`font-medium ${getChangeColor(data.totalPnl)}`}>
              {formatCurrency(data.totalPnl)} ({formatPercentage(data.totalPnlPercent)})
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">24h Change</span>
            <div className={`flex items-center gap-1 ${getChangeColor(data.dailyChange)}`}>
              {data.dailyChange > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-sm font-medium">
                {formatCurrency(data.dailyChange)} ({formatPercentage(data.dailyChangePercent)})
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Top Holdings</h4>
          <div className="space-y-3">
            {data.holdings.slice(0, 3).map((holding) => (
              <div key={holding.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={holding.image} alt={holding.symbol} />
                    <AvatarFallback className="text-xs">
                      {holding.symbol.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{holding.symbol}</div>
                    <div className="text-xs text-muted-foreground">
                      {holding.quantity.toFixed(4)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(holding.totalValue)}
                  </div>
                  <div className={`text-xs ${getChangeColor(holding.pnl)}`}>
                    {formatPercentage(holding.pnlPercent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {data.holdings.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No holdings found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};