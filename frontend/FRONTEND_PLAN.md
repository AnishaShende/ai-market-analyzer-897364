# AI Market Analyzer - Frontend Implementation Plan

## Tech Stack
- React 19 with hooks & concurrent features
- Vite build tool
- shadcn/ui component library
- Tailwind CSS v4 for styling
- React Router DOM for navigation
- TanStack Query for data fetching
- Recharts for visualizations

## Page-by-Page Implementation Plan

### 1. Layout & Common Components
**Files:** `src/components/layout/`, `src/components/common/`
- **AppLayout.tsx** - Main layout with sidebar navigation
- **Header.tsx** - Top navigation with user menu, notifications
- **Sidebar.tsx** - Navigation menu (Dashboard, Markets, Analysis, Alerts, Settings)
- **LoadingSpinner.tsx** - Global loading component
- **ErrorBoundary.tsx** - Error handling wrapper
- **ThemeProvider.tsx** - Theme management (dark/light mode)

**API Endpoints:** None (layout only)

### 2. Dashboard Page
**Route:** `/dashboard`
**Files:** `src/pages/Dashboard/`
- **Dashboard.tsx** - Main dashboard container
- **MarketOverview.tsx** - Summary cards (total portfolio, daily change, etc.)
- **TrendingMarkets.tsx** - Top gaining/losing markets widget
- **RecentAlerts.tsx** - Latest market alerts component
- **PortfolioChart.tsx** - Portfolio performance chart
- **QuickActions.tsx** - Quick action buttons

**Utils:** `src/utils/dashboard.ts` - Dashboard data calculations
**Types:** `src/types/dashboard.ts` - Dashboard data interfaces
**API Endpoints:** 
- `GET /api/dashboard/overview`
- `GET /api/dashboard/trending`
- `GET /api/alerts/recent`

### 3. Markets Page
**Route:** `/markets`
**Files:** `src/pages/Markets/`
- **Markets.tsx** - Markets listing container
- **MarketTable.tsx** - Sortable/filterable market data table
- **MarketFilters.tsx** - Filter panel (category, price range, volume)
- **MarketSearch.tsx** - Search functionality
- **MarketCard.tsx** - Individual market display card
- **PriceChart.tsx** - Real-time price chart component

**Utils:** `src/utils/markets.ts` - Market data formatting, calculations
**Types:** `src/types/markets.ts` - Market data interfaces
**API Endpoints:**
- `GET /api/markets`
- `GET /api/markets/:id/chart`
- `GET /api/markets/search`

### 4. Analysis Page
**Route:** `/analysis`
**Files:** `src/pages/Analysis/`
- **Analysis.tsx** - Analysis dashboard container
- **TechnicalAnalysis.tsx** - Technical indicators & charts
- **SentimentAnalysis.tsx** - AI-powered sentiment analysis
- **PredictionEngine.tsx** - AI market predictions display
- **CorrelationMatrix.tsx** - Market correlation visualization
- **RiskAssessment.tsx** - Risk analysis components
- **AIInsights.tsx** - AI-generated insights panel

**Utils:** 
- `src/utils/analysis.ts` - Analysis calculations
- `src/utils/aiInsights.ts` - AI insight formatting
**Types:** `src/types/analysis.ts` - Analysis data interfaces
**API Endpoints:**
- `GET /api/analysis/technical/:symbol`
- `GET /api/analysis/sentiment/:symbol`
- `GET /api/analysis/predictions/:symbol`
- `GET /api/analysis/correlations`

### 5. Alerts Page
**Route:** `/alerts`
**Files:** `src/pages/Alerts/`
- **Alerts.tsx** - Alerts management container
- **AlertList.tsx** - List of active alerts
- **AlertForm.tsx** - Create/edit alert form
- **AlertCard.tsx** - Individual alert display
- **AlertSettings.tsx** - Alert preferences
- **NotificationCenter.tsx** - Real-time notifications

**Utils:** `src/utils/alerts.ts` - Alert validation, formatting
**Types:** `src/types/alerts.ts` - Alert interfaces
**API Endpoints:**
- `GET /api/alerts`
- `POST /api/alerts`
- `PUT /api/alerts/:id`
- `DELETE /api/alerts/:id`

### 6. Portfolio Page
**Route:** `/portfolio`
**Files:** `src/pages/Portfolio/`
- **Portfolio.tsx** - Portfolio overview container
- **HoldingsList.tsx** - Current holdings table
- **PerformanceChart.tsx** - Portfolio performance visualization
- **AssetAllocation.tsx** - Pie chart of asset distribution
- **TransactionHistory.tsx** - Trade history table
- **PortfolioMetrics.tsx** - Key metrics (ROI, Sharpe ratio, etc.)

**Utils:** `src/utils/portfolio.ts` - Portfolio calculations
**Types:** `src/types/portfolio.ts` - Portfolio data interfaces
**API Endpoints:**
- `GET /api/portfolio`
- `GET /api/portfolio/performance`
- `GET /api/portfolio/transactions`

### 7. Settings Page
**Route:** `/settings`
**Files:** `src/pages/Settings/`
- **Settings.tsx** - Settings container with tabs
- **ProfileSettings.tsx** - User profile management
- **NotificationSettings.tsx** - Notification preferences
- **APISettings.tsx** - API key management
- **ThemeSettings.tsx** - Theme and display preferences
- **ExportSettings.tsx** - Data export options

**Utils:** `src/utils/settings.ts` - Settings validation
**Types:** `src/types/settings.ts` - Settings interfaces
**API Endpoints:**
- `GET /api/user/settings`
- `PUT /api/user/settings`
- `POST /api/user/api-keys`

### 8. Market Detail Page
**Route:** `/markets/:symbol`
**Files:** `src/pages/MarketDetail/`
- **MarketDetail.tsx** - Market detail container
- **PriceHeader.tsx** - Current price and change info
- **DetailedChart.tsx** - Advanced price chart with indicators
- **OrderBook.tsx** - Buy/sell order book
- **TradeHistory.tsx** - Recent trades table
- **MarketStats.tsx** - Market statistics panel
- **RelatedMarkets.tsx** - Similar/correlated markets

**Utils:** `src/utils/marketDetail.ts` - Detail page calculations
**Types:** `src/types/marketDetail.ts` - Market detail interfaces
**API Endpoints:**
- `GET /api/markets/:symbol/details`
- `GET /api/markets/:symbol/orderbook`
- `GET /api/markets/:symbol/trades`

## Common Utilities & Services

### Core Services
**Files:** `src/services/`
- **api.ts** - Enhanced API client with interceptors
- **websocket.ts** - Real-time data connection
- **storage.ts** - Local storage management
- **notifications.ts** - Push notification service

### Common Hooks
**Files:** `src/hooks/`
- **useMarketData.ts** - Market data fetching hook
- **useWebSocket.ts** - WebSocket connection hook  
- **useLocalStorage.ts** - Local storage hook
- **useNotifications.ts** - Notifications hook
- **useTheme.ts** - Theme management hook

### Utilities
**Files:** `src/utils/`
- **formatters.ts** - Number, date, currency formatting
- **validators.ts** - Form validation functions
- **calculations.ts** - Financial calculations
- **constants.ts** - App constants and enums

### Types
**Files:** `src/types/`
- **api.ts** - API response types
- **common.ts** - Shared interfaces
- **user.ts** - User-related types

## Implementation Order
1. Layout & Common Components
2. Dashboard Page (MVP functionality)
3. Markets Page (core data display)
4. Market Detail Page (detailed view)
5. Analysis Page (AI features)
6. Portfolio Page (user data)
7. Alerts Page (notifications)
8. Settings Page (configuration)

## Key Features per Phase
- **Phase 1:** Basic navigation, market listing, simple charts
- **Phase 2:** Real-time updates, detailed analysis, portfolio tracking  
- **Phase 3:** AI insights, advanced alerts, export functionality
- **Phase 4:** Advanced charts, correlation analysis, risk metrics