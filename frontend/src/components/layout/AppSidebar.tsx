import { 
  BarChart3, 
  TrendingUp, 
  Search, 
  Bell, 
  Briefcase, 
  Settings, 
  Home,
  Bot
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: Home,
    url: '/dashboard',
  },
  {
    title: 'Markets',
    icon: TrendingUp,
    url: '/markets',
  },
  {
    title: 'Analysis',
    icon: BarChart3,
    url: '/analysis',
    comingSoon: true,
  },
  {
    title: 'Portfolio',
    icon: Briefcase,
    url: '/portfolio',
    comingSoon: true,
  },
  {
    title: 'Alerts',
    icon: Bell,
    url: '/alerts',
    comingSoon: true,
  },
  {
    title: 'Search',
    icon: Search,
    url: '/search',
    comingSoon: true,
  },
  {
    title: 'Settings',
    icon: Settings,
    url: '/settings',
    comingSoon: true,
  },
];

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AI Market</span>
                  <span className="truncate text-xs">Analyzer</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!item.comingSoon}
                isActive={location.pathname === item.url}
                tooltip={item.title}
              >
                {item.comingSoon ? (
                  <div className="flex items-center gap-2 opacity-50">
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                  </div>
                ) : (
                  <Link to={item.url} className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  AI
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">AI Analyst</span>
                  <span className="truncate text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
};