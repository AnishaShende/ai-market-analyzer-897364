import type { 
  Market, 
  DashboardOverview, 
  TrendingMarket, 
  MarketAlert, 
  AIInsight,
  PortfolioSummary,
  MarketDetail,
  MarketChart
} from '@/types/market';

export const mockMarkets: Market[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.75,
    change24h: 1250.30,
    changePercent24h: 2.98,
    volume24h: 28500000000,
    marketCap: 845000000000,
    rank: 1,
    category: 'cryptocurrency',
    lastUpdated: new Date().toISOString(),
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2650.45,
    change24h: -85.20,
    changePercent24h: -3.11,
    volume24h: 15200000000,
    marketCap: 318000000000,
    rank: 2,
    category: 'cryptocurrency',
    lastUpdated: new Date().toISOString(),
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    id: '3',
    symbol: 'SOL',
    name: 'Solana',
    price: 98.76,
    change24h: 4.32,
    changePercent24h: 4.57,
    volume24h: 2100000000,
    marketCap: 45000000000,
    rank: 3,
    category: 'cryptocurrency',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '4',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.485,
    change24h: 0.023,
    changePercent24h: 4.98,
    volume24h: 450000000,
    marketCap: 17000000000,
    rank: 4,
    category: 'cryptocurrency',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '5',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 36.75,
    change24h: -1.24,
    changePercent24h: -3.26,
    volume24h: 680000000,
    marketCap: 14500000000,
    rank: 5,
    category: 'cryptocurrency',
    lastUpdated: new Date().toISOString(),
  }
];

export const mockDashboardOverview: DashboardOverview = {
  totalMarketCap: 1240000000000,
  totalVolume: 47000000000,
  btcDominance: 51.2,
  ethDominance: 17.8,
  marketCapChange24h: 2.34,
  activeMarkets: 2847
};

export const mockTrendingMarkets: TrendingMarket[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.75,
    changePercent24h: 2.98,
    rank: 1,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    id: '3',
    symbol: 'SOL',
    name: 'Solana',
    price: 98.76,
    changePercent24h: 4.57,
    rank: 3,
  },
  {
    id: '4',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.485,
    changePercent24h: 4.98,
    rank: 4,
  }
];

export const mockRecentAlerts: MarketAlert[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'price_above',
    condition: 43000,
    currentValue: 43250.75,
    triggered: true,
    createdAt: '2024-01-15T10:30:00Z',
    triggeredAt: '2024-01-15T14:22:00Z',
    message: 'Bitcoin price exceeded $43,000'
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'percent_change',
    condition: -3,
    currentValue: -3.11,
    triggered: true,
    createdAt: '2024-01-15T09:00:00Z',
    triggeredAt: '2024-01-15T13:45:00Z',
    message: 'Ethereum dropped more than 3% in 24h'
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    symbol: 'BTC',
    type: 'bullish',
    confidence: 0.78,
    title: 'Strong Institutional Buying Pressure',
    description: 'Analysis indicates significant institutional accumulation patterns in Bitcoin',
    reasoning: [
      'Large wallet addresses showing increased activity',
      'Reduced exchange reserves indicate holding behavior',
      'Options flow suggests bullish sentiment'
    ],
    createdAt: '2024-01-15T12:00:00Z',
    timeframe: '7d'
  },
  {
    id: '2',
    symbol: 'ETH',
    type: 'bearish',
    confidence: 0.65,
    title: 'Network Congestion Concerns',
    description: 'High gas fees and network congestion may impact short-term price action',
    reasoning: [
      'Gas fees at 6-month highs',
      'DeFi activity showing signs of migration',
      'Technical indicators suggest potential correction'
    ],
    createdAt: '2024-01-15T11:30:00Z',
    timeframe: '1d'
  }
];

export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 125750.50,
  totalPnl: 15750.25,
  totalPnlPercent: 14.32,
  dailyChange: 2150.75,
  dailyChangePercent: 1.74,
  holdings: [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      quantity: 2.5,
      averageBuyPrice: 38500,
      currentPrice: 43250.75,
      totalValue: 108126.88,
      pnl: 11876.88,
      pnlPercent: 12.34,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      quantity: 6.5,
      averageBuyPrice: 2400,
      currentPrice: 2650.45,
      totalValue: 17227.93,
      pnl: 1627.93,
      pnlPercent: 10.44,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
    }
  ]
};

export const mockMarketDetail: MarketDetail = {
  id: '1',
  symbol: 'BTC',
  name: 'Bitcoin',
  price: 43250.75,
  change24h: 1250.30,
  changePercent24h: 2.98,
  volume24h: 28500000000,
  marketCap: 845000000000,
  rank: 1,
  category: 'cryptocurrency',
  lastUpdated: new Date().toISOString(),
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  description: 'Bitcoin is a decentralized digital currency that can be transferred on the peer-to-peer bitcoin network.',
  website: 'https://bitcoin.org',
  totalSupply: 21000000,
  circulatingSupply: 19500000,
  high24h: 43850.20,
  low24h: 41950.45,
  priceChange7d: 2850.75,
  priceChangePercent7d: 7.05,
  priceChange30d: -1250.30,
  priceChangePercent30d: -2.81,
  allTimeHigh: 69045.22,
  allTimeHighDate: '2021-11-10T14:24:11.849Z',
  allTimeLow: 67.81,
  allTimeLowDate: '2013-07-06T00:00:00.000Z'
};

export const mockMarketChart: MarketChart[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: Date.now() - (23 - i) * 60 * 60 * 1000,
  price: 42000 + Math.random() * 2000 + Math.sin(i * 0.5) * 1000,
  volume: 1000000000 + Math.random() * 500000000
}));