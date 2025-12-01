import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CabbieoAlternatives from "./pages/alternatives/CabbieoAlternatives";
import CabbieoVsUber from "./pages/alternatives/CabbieoVsUber";
import CabbieoVsOla from "./pages/alternatives/CabbieoVsOla";
import CabbieoVsRapido from "./pages/alternatives/CabbieoVsRapido";
import CabbieoVsAppBasedCabs from "./pages/alternatives/CabbieoVsAppBasedCabs";
import CabbieoVsTraditionalCabs from "./pages/alternatives/CabbieoVsTraditionalCabs";
import CabbieoVsBikeTaxis from "./pages/alternatives/CabbieoVsBikeTaxis";
import CabbieoFAQ from "./pages/faq/CabbieoFAQ";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import TermsAndConditions from "./pages/terms/TermsAndConditions";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import DriverRegister from "./pages/driver/Register";
import DriverDashboard from "./pages/driver/Dashboard";
import CabbieoSolutions from "./pages/solutions/CabbieoSolutions";

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
          <Route path="/alternatives/cabbieo-vs-ubercom" element={<CabbieoVsUber />} />
          <Route path="/alternatives/cabbieo-vs-olacabscom" element={<CabbieoVsOla />} />
          <Route path="/alternatives/cabbieo-vs-rapidobike" element={<CabbieoVsRapido />} />
          <Route path="/alternatives/cabbieo-vs-app-based-cabs" element={<CabbieoVsAppBasedCabs />} />
          <Route path="/alternatives/cabbieo-vs-traditional-cabs" element={<CabbieoVsTraditionalCabs />} />
          <Route path="/alternatives/cabbieo-vs-bike-taxis" element={<CabbieoVsBikeTaxis />} />
          <Route path="/faq/cabbieo" element={<CabbieoFAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />} />
          <Route path="/driver/register" element={<DriverRegister />} />
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/solutions/cabbieo" element={<CabbieoSolutions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
