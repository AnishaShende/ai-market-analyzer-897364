import { useQuery } from '@tanstack/react-query';
import { marketService } from '@/services/market';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { TrendingMarkets } from '@/components/dashboard/TrendingMarkets';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const DashboardPage = () => {
  const { 
    data: overview, 
    isLoading: overviewLoading, 
    error: overviewError 
  } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: marketService.getDashboardOverview,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const { 
    data: trending, 
    isLoading: trendingLoading 
  } = useQuery({
    queryKey: ['trending-markets'],
    queryFn: marketService.getTrendingMarkets,
    refetchInterval: 30000
  });

  const { 
    data: alerts, 
    isLoading: alertsLoading 
  } = useQuery({
    queryKey: ['recent-alerts'],
    queryFn: marketService.getRecentAlerts,
    refetchInterval: 60000
  });

  const { 
    data: portfolio, 
    isLoading: portfolioLoading 
  } = useQuery({
    queryKey: ['portfolio-summary'],
    queryFn: marketService.getPortfolioSummary,
    refetchInterval: 30000
  });

  const { 
    data: insights, 
    isLoading: insightsLoading 
  } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: () => marketService.getAIInsights(),
    refetchInterval: 300000 // Refetch every 5 minutes
  });

  if (overviewError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Market Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time market analysis and AI-powered insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Overview */}
        <div className="lg:col-span-2 space-y-6">
          {overviewLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          ) : (
            overview && <MarketOverview data={overview} />
          )}

          {trendingLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            trending && <TrendingMarkets data={trending} />
          )}
        </div>

        {/* Right Column - Side Panels */}
        <div className="space-y-6">
          {portfolioLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            portfolio && <PortfolioSummary data={portfolio} />
          )}

          {alertsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            alerts && <RecentAlerts data={alerts} />
          )}

          {insightsLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            insights && <AIInsights data={insights.slice(0, 3)} />
          )}
        </div>
      </div>
    </div>
  );
};