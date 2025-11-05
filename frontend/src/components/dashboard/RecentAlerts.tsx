import { MarketAlert } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatRelativeTime } from '@/utils/formatters';

interface RecentAlertsProps {
  data: MarketAlert[];
}

const getAlertIcon = (type: MarketAlert['type']) => {
  switch (type) {
    case 'price_above':
      return TrendingUp;
    case 'price_below':
      return TrendingDown;
    case 'volume_spike':
      return Activity;
    case 'percent_change':
      return AlertTriangle;
    default:
      return Bell;
  }
};

const getAlertColor = (type: MarketAlert['type']) => {
  switch (type) {
    case 'price_above':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'price_below':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'volume_spike':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'percent_change':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export const RecentAlerts = ({ data }: RecentAlertsProps) => {
  const triggeredAlerts = data.filter(alert => alert.triggered);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <CardTitle>Recent Alerts</CardTitle>
        </div>
        {triggeredAlerts.length > 0 && (
          <Badge variant="destructive" className="text-xs">
            {triggeredAlerts.length} new
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 5).map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  alert.triggered ? 'bg-muted/50' : 'opacity-60'
                }`}
              >
                <div className={`p-1 rounded-full ${getAlertColor(alert.type)}`}>
                  <Icon className="h-3 w-3" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{alert.symbol}</span>
                    {alert.triggered && (
                      <Badge variant="secondary" className="text-xs">
                        Triggered
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1">
                    {alert.message}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    {alert.triggered && alert.triggeredAt
                      ? formatRelativeTime(alert.triggeredAt)
                      : formatRelativeTime(alert.createdAt)
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};