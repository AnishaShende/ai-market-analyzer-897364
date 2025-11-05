import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { marketService } from '@/services/market';
import { PriceHeader } from '@/components/market-detail/PriceHeader';
import { PriceChart } from '@/components/market-detail/PriceChart';
import { MarketStats } from '@/components/market-detail/MarketStats';
import { MarketDescription } from '@/components/market-detail/MarketDescription';
import { RelatedMarkets } from '@/components/market-detail/RelatedMarkets';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const MarketDetailPage = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const { 
    data: marketDetail, 
    isLoading: detailLoading, 
    error: detailError 
  } = useQuery({
    queryKey: ['market-detail', symbol],
    queryFn: () => marketService.getMarketDetail(symbol!),
    enabled: !!symbol,
    refetchInterval: 30000
  });

  const { 
    data: chartData, 
    isLoading: chartLoading 
  } = useQuery({
    queryKey: ['market-chart', symbol],
    queryFn: () => marketService.getMarketChart(symbol!, '24h'),
    enabled: !!symbol,
    refetchInterval: 60000
  });

  const { 
    data: insights 
  } = useQuery({
    queryKey: ['ai-insights', symbol],
    queryFn: () => marketService.getAIInsights(symbol!),
    enabled: !!symbol,
    refetchInterval: 300000
  });

  if (!symbol) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Invalid market symbol provided.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/markets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Markets
          </Link>
        </Button>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load market details for {symbol.toUpperCase()}. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/markets">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Markets
        </Link>
      </Button>

      {detailLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      ) : marketDetail ? (
        <>
          <PriceHeader market={marketDetail} insights={insights} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {chartLoading ? (
                <Skeleton className="h-96 w-full" />
              ) : chartData ? (
                <PriceChart data={chartData} symbol={symbol} />
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Chart data is currently unavailable.
                  </AlertDescription>
                </Alert>
              )}
              
              {marketDetail.description && (
                <MarketDescription 
                  description={marketDetail.description}
                  website={marketDetail.website}
                />
              )}
            </div>
            
            <div className="space-y-6">
              <MarketStats market={marketDetail} />
              <RelatedMarkets currentSymbol={symbol} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};