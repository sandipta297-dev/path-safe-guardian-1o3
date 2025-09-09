import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PWAInstaller, PWAInstallSuccess } from "@/components/PWAInstaller";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { BottomNavigation } from "@/components/BottomNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useAppStore, useAuthStore } from './lib/store';
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import PanicPage from "./pages/PanicPage";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import MapPage from "./pages/Map";
import Profile from "./pages/Profile";
import Itinerary from "./pages/Itinerary";
import DigitalID from "./pages/DigitalID";
import NotFound from "./pages/NotFound";
import { OfflineQueue } from "./components/OfflineQueue";

// Import admin pages
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminRegister from "./pages/admin/auth/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTourists from "./pages/admin/AdminTourists";
import AdminAlerts from "./pages/admin/AdminAlerts";
import AdminIncidents from "./pages/admin/AdminIncidents";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminAudit from "./pages/admin/AdminAudit";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

function AppContent() {
  const { setOnlineStatus, isOnline } = useAppStore();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  // Don't show bottom navigation on auth pages, landing page, and admin routes
  const showBottomNav = isAuthenticated && 
    !['/auth/login', '/auth/register', '/'].includes(location.pathname) &&
    !location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      <Sonner />
      <OfflineIndicator />
      <PWAInstaller />
      <PWAInstallSuccess />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/panic" element={<PanicPage />} />
        <Route path="/digital-id" element={<DigitalID />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        {/* Admin Routes */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />
        <Route path="/admin/auth/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tourists" element={<AdminTourists />} />
        <Route path="/admin/alerts" element={<AdminAlerts />} />
        <Route path="/admin/incidents" element={<AdminIncidents />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/audit" element={<AdminAudit />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showBottomNav && <BottomNavigation />}
      <OfflineQueue isOnline={isOnline} />
    </>
  );
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
