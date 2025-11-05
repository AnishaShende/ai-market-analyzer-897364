export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(value);
};

export const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  }).format(value);
};

export const formatLargeNumber = (value: number) => {
  if (value >= 1e12) {
    return `${formatNumber(value / 1e12)}T`;
  }
  if (value >= 1e9) {
    return `${formatNumber(value / 1e9)}B`;
  }
  if (value >= 1e6) {
    return `${formatNumber(value / 1e6)}M`;
  }
  if (value >= 1e3) {
    return `${formatNumber(value / 1e3)}K`;
  }
  return formatNumber(value);
};

export const formatPercentage = (value: number, decimals: number = 2) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  });
};

export const formatTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}d ago`;
  }
  
  return formatDate(dateObj);
};

export const getChangeColor = (value: number) => {
  if (value > 0) return 'text-green-600 dark:text-green-400';
  if (value < 0) return 'text-red-600 dark:text-red-400';
  return 'text-muted-foreground';
};

export const getChangeIcon = (value: number) => {
  if (value > 0) return '▲';
  if (value < 0) return '▼';
  return '—';
};