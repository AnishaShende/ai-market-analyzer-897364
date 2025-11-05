import { DashboardOverview } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatLargeNumber, formatPercentage, getChangeColor } from '@/utils/formatters';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';

interface MarketOverviewProps {
  data: DashboardOverview;
}

export const MarketOverview = ({ data }: MarketOverviewProps) => {
  const overviewItems = [
    {
      title: 'Total Market Cap',
      value: formatLargeNumber(data.totalMarketCap),
      change: data.marketCapChange24h,
      icon: TrendingUp,
      description: '24h change'
    },
    {
      title: 'Total Volume',
      value: formatLargeNumber(data.totalVolume),
      icon: Activity,
      description: '24h volume'
    },
    {
      title: 'BTC Dominance',
      value: `${data.btcDominance}%`,
      icon: Target,
      description: 'Market share'
    },
    {
      title: 'Active Markets',
      value: data.activeMarkets.toLocaleString(),
      icon: TrendingUp,
      description: 'Trading pairs'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {item.change !== undefined && (
                  <span className={getChangeColor(item.change)}>
                    {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {formatPercentage(item.change)}
                  </span>
                )}
                <span>{item.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Market Dominance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm">Bitcoin (BTC)</span>
              </div>
              <span className="text-sm font-medium">{data.btcDominance}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm">Ethereum (ETH)</span>
              </div>
              <span className="text-sm font-medium">{data.ethDominance}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="text-sm">Others</span>
              </div>
              <span className="text-sm font-medium">
                {(100 - data.btcDominance - data.ethDominance).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="flex h-full rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500" 
                  style={{ width: `${data.btcDominance}%` }} 
                />
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${data.ethDominance}%` }} 
                />
                <div 
                  className="bg-gray-400" 
                  style={{ width: `${100 - data.btcDominance - data.ethDominance}%` }} 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};