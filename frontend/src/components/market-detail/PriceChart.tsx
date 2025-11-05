import { MarketChart } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from 'recharts';
import { formatCurrency, formatTime } from '@/utils/formatters';

interface PriceChartProps {
  data: MarketChart[];
  symbol: string;
}

export const PriceChart = ({ data, symbol }: PriceChartProps) => {
  const formatXAxis = (tickItem: number) => {
    return formatTime(new Date(tickItem));
  };

  const formatTooltip = (value: any, name: string) => {
    if (name === 'price') {
      return [formatCurrency(value), 'Price'];
    }
    return [value, name];
  };

  const formatTooltipLabel = (label: number) => {
    return new Date(label).toLocaleString();
  };

  // Calculate price trend for gradient
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{symbol.toUpperCase()} Price Chart (24h)</span>
          <span className="text-sm font-normal text-muted-foreground">
            Last 24 hours
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
              
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => formatCurrency(value, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              />
              
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={formatTooltipLabel}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">
              {formatCurrency(Math.max(...data.map(d => d.price)))}
            </div>
            <div className="text-sm text-muted-foreground">24h High</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold">
              {formatCurrency(data.reduce((avg, d) => avg + d.price, 0) / data.length)}
            </div>
            <div className="text-sm text-muted-foreground">Average</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold">
              {formatCurrency(Math.min(...data.map(d => d.price)))}
            </div>
            <div className="text-sm text-muted-foreground">24h Low</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};