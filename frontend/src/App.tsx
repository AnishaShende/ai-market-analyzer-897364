import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MarketsPage } from './pages/MarketsPage';
import { MarketDetailPage } from './pages/MarketDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <div className="h-screen w-screen bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/markets/:symbol" element={<MarketDetailPage />} />
              </Route>
            </Routes>
            <Toaster richColors position="top-right" />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
