import { AIInsight } from '@/types/market';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatRelativeTime } from '@/utils/formatters';

interface AIInsightsProps {
  data: AIInsight[];
}

const getInsightIcon = (type: AIInsight['type']) => {
  switch (type) {
    case 'bullish':
      return TrendingUp;
    case 'bearish':
      return TrendingDown;
    case 'neutral':
      return Minus;
    default:
      return Bot;
  }
};

const getInsightColor = (type: AIInsight['type']) => {
  switch (type) {
    case 'bullish':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'bearish':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'neutral':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
  if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

export const AIInsights = ({ data }: AIInsightsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          <CardTitle>AI Insights</CardTitle>
        </div>
        <Badge variant="outline" className="text-xs">
          Powered by AI
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full ${getInsightColor(insight.type)}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-sm">{insight.symbol}</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {insight.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                      {(insight.confidence * 100).toFixed(0)}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {insight.timeframe}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {insight.description}
                  </p>
                  
                  <div className="space-y-1">
                    {insight.reasoning.slice(0, 2).map((reason, index) => (
                      <div key={index} className="flex items-start gap-1">
                        <span className="text-muted-foreground text-xs mt-0.5">•</span>
                        <span className="text-xs text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {formatRelativeTime(insight.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No AI insights available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};