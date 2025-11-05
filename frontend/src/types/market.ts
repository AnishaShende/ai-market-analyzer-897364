export interface Market {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  image?: string;
  category: string;
  lastUpdated: string;
}

export interface MarketChart {
  timestamp: number;
  price: number;
  volume: number;
}

export interface MarketDetail extends Market {
  description?: string;
  website?: string;
  totalSupply?: number;
  circulatingSupply?: number;
  high24h: number;
  low24h: number;
  priceChange7d: number;
  priceChangePercent7d: number;
  priceChange30d: number;
  priceChangePercent30d: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  allTimeLow: number;
  allTimeLowDate: string;
}

export interface DashboardOverview {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  marketCapChange24h: number;
  activeMarkets: number;
}

export interface TrendingMarket {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent24h: number;
  image?: string;
  rank: number;
}

export interface MarketAlert {
  id: string;
  symbol: string;
  name: string;
  type: 'price_above' | 'price_below' | 'volume_spike' | 'percent_change';
  condition: number;
  currentValue: number;
  triggered: boolean;
  createdAt: string;
  triggeredAt?: string;
  message: string;
}

export interface AIInsight {
  id: string;
  symbol: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  title: string;
  description: string;
  reasoning: string[];
  createdAt: string;
  timeframe: '1h' | '4h' | '1d' | '7d' | '30d';
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
  image?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  holdings: PortfolioHolding[];
  dailyChange: number;
  dailyChangePercent: number;
}

export interface MarketFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minVolume?: number;
  maxVolume?: number;
  minMarketCap?: number;
  maxMarketCap?: number;
  sortBy?: 'rank' | 'price' | 'change24h' | 'volume24h' | 'marketCap';
  sortOrder?: 'asc' | 'desc';
}

export interface MarketSearchResult {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  rank: number;
  price: number;
}