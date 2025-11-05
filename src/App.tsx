import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CabbieoAlternatives from "./pages/alternatives/CabbieoAlternatives";
import CabbieoFAQ from "./pages/faq/CabbieoFAQ";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import DriverRegister from "./pages/driver/Register";
import DriverDashboard from "./pages/driver/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alternatives/cabbieo-alternatives" element={<CabbieoAlternatives />} />
          <Route path="/faq/cabbieo" element={<CabbieoFAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />} />
          <Route path="/driver/register" element={<DriverRegister />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
