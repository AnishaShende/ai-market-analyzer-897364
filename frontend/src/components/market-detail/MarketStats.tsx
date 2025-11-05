import { MarketDetail } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatLargeNumber, formatPercentage, formatDate, getChangeColor } from '@/utils/formatters';
import { BarChart3 } from 'lucide-react';

interface MarketStatsProps {
  market: MarketDetail;
}

export const MarketStats = ({ market }: MarketStatsProps) => {
  const stats = [
    {
      label: 'Market Cap',
      value: formatLargeNumber(market.marketCap),
      rank: `#${market.rank}`
    },
    {
      label: '24h Volume',
      value: formatLargeNumber(market.volume24h)
    },
    {
      label: 'Circulating Supply',
      value: market.circulatingSupply ? formatLargeNumber(market.circulatingSupply) : 'N/A',
      subValue: market.totalSupply ? `of ${formatLargeNumber(market.totalSupply)}` : undefined
    },
    {
      label: '7d Change',
      value: formatPercentage(market.priceChangePercent7d),
      valueColor: getChangeColor(market.priceChangePercent7d)
    },
    {
      label: '30d Change', 
      value: formatPercentage(market.priceChangePercent30d),
      valueColor: getChangeColor(market.priceChangePercent30d)
    },
    {
      label: 'All-Time High',
      value: formatCurrency(market.allTimeHigh),
      subValue: formatDate(market.allTimeHighDate)
    },
    {
      label: 'All-Time Low',
      value: formatCurrency(market.allTimeLow),
      subValue: formatDate(market.allTimeLowDate)
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          <CardTitle>Market Statistics</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div className="text-right">
                <div className={`font-medium ${stat.valueColor || ''}`}>
                  {stat.value}
                  {stat.rank && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {stat.rank}
                    </span>
                  )}
                </div>
                {stat.subValue && (
                  <div className="text-xs text-muted-foreground">
                    {stat.subValue}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Price Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>24h Range:</span>
              <span>{formatCurrency(market.low24h)} - {formatCurrency(market.high24h)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>From ATH:</span>
              <span className={getChangeColor((market.price - market.allTimeHigh) / market.allTimeHigh * 100)}>
                {formatPercentage((market.price - market.allTimeHigh) / market.allTimeHigh * 100)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span>From ATL:</span>
              <span className={getChangeColor((market.price - market.allTimeLow) / market.allTimeLow * 100)}>
                {formatPercentage((market.price - market.allTimeLow) / market.allTimeLow * 100)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};