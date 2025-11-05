import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import type { 
  Market, 
  DashboardOverview, 
  TrendingMarket, 
  MarketAlert, 
  AIInsight,
  PortfolioSummary,
  MarketDetail,
  MarketChart,
  MarketFilters,
  MarketSearchResult
} from '@/types/market';
import {
  mockMarkets,
  mockDashboardOverview,
  mockTrendingMarkets,
  mockRecentAlerts,
  mockAIInsights,
  mockPortfolioSummary,
  mockMarketDetail,
  mockMarketChart
} from '@/data/mockMarketData';

export const marketService = {
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getDashboardOverview ---');
      await mockApiDelay();
      return mockDashboardOverview;
    }
    const response = await api.get('/dashboard/overview');
    return response.data;
  },

  getTrendingMarkets: async (): Promise<TrendingMarket[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getTrendingMarkets ---');
      await mockApiDelay();
      return mockTrendingMarkets;
    }
    const response = await api.get('/dashboard/trending');
    return response.data;
  },

  getRecentAlerts: async (): Promise<MarketAlert[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getRecentAlerts ---');
      await mockApiDelay();
      return mockRecentAlerts;
    }
    const response = await api.get('/alerts/recent');
    return response.data;
  },

  getMarkets: async (filters?: MarketFilters): Promise<Market[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getMarkets ---', filters);
      await mockApiDelay();
      let filteredMarkets = [...mockMarkets];
      
      if (filters?.category) {
        filteredMarkets = filteredMarkets.filter(m => m.category === filters.category);
      }
      if (filters?.minPrice) {
        filteredMarkets = filteredMarkets.filter(m => m.price >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        filteredMarkets = filteredMarkets.filter(m => m.price <= filters.maxPrice!);
      }
      if (filters?.sortBy) {
        filteredMarkets.sort((a, b) => {
          const field = filters.sortBy!;
          const order = filters.sortOrder === 'desc' ? -1 : 1;
          return (a[field as keyof Market] as number) > (b[field as keyof Market] as number) ? order : -order;
        });
      }
      
      return filteredMarkets;
    }
    const response = await api.get('/markets', { params: filters });
    return response.data;
  },

  getMarketDetail: async (symbol: string): Promise<MarketDetail> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getMarketDetail ---', symbol);
      await mockApiDelay();
      return { ...mockMarketDetail, symbol: symbol.toUpperCase() };
    }
    const response = await api.get(`/markets/${symbol}/details`);
    return response.data;
  },

  getMarketChart: async (symbol: string, timeframe: string = '24h'): Promise<MarketChart[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getMarketChart ---', symbol, timeframe);
      await mockApiDelay();
      return mockMarketChart;
    }
    const response = await api.get(`/markets/${symbol}/chart`, { params: { timeframe } });
    return response.data;
  },

  searchMarkets: async (query: string): Promise<MarketSearchResult[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: searchMarkets ---', query);
      await mockApiDelay();
      return mockMarkets
        .filter(m => 
          m.symbol.toLowerCase().includes(query.toLowerCase()) ||
          m.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10)
        .map(m => ({
          id: m.id,
          symbol: m.symbol,
          name: m.name,
          image: m.image,
          rank: m.rank,
          price: m.price
        }));
    }
    const response = await api.get('/markets/search', { params: { q: query } });
    return response.data;
  },

  getAIInsights: async (symbol?: string): Promise<AIInsight[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getAIInsights ---', symbol);
      await mockApiDelay();
      return symbol 
        ? mockAIInsights.filter(insight => insight.symbol === symbol.toUpperCase())
        : mockAIInsights;
    }
    const response = await api.get('/ai/insights', { params: symbol ? { symbol } : {} });
    return response.data;
  },

  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getPortfolioSummary ---');
      await mockApiDelay();
      return mockPortfolioSummary;
    }
    const response = await api.get('/portfolio/summary');
    return response.data;
  }
};