import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Users, Menu, DollarSign, Route, MapPin, Bus, Package, Ticket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { BookingsSection } from "./BookingsSection";
import { DriversSection } from "./DriversSection";
import PricingSection from "./PricingSection";
import { PackageRoutesSection } from "./PackageRoutesSection";
import { PickupPointsSection } from "./PickupPointsSection";
import { PackageVehiclesSection } from "./PackageVehiclesSection";
import { PackagesSection } from "./PackagesSection";
import { PackageBookingsSection } from "./PackageBookingsSection";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type TabType = "bookings" | "drivers" | "pricing" | "pkg-routes" | "pkg-pickup" | "pkg-vehicles" | "pkg-packages" | "pkg-bookings";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, loading } = useAdminCheck();
  const [activeTab, setActiveTab] = useState<TabType>(
    (location.state?.section as TabType) || "bookings"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout सफल रहा!");
    navigate("/admin/login");
  };

  const cabBookingItems = [
    { id: "bookings" as const, label: "Cab Bookings", icon: BookOpen },
    { id: "drivers" as const, label: "Drivers", icon: Users },
    { id: "pricing" as const, label: "Pricing", icon: DollarSign },
  ];

  const packageItems = [
    { id: "pkg-routes" as const, label: "Routes", icon: Route },
    { id: "pkg-pickup" as const, label: "Pickup Points", icon: MapPin },
    { id: "pkg-vehicles" as const, label: "Vehicles", icon: Bus },
    { id: "pkg-packages" as const, label: "Packages", icon: Package },
    { id: "pkg-bookings" as const, label: "Package Bookings", icon: Ticket },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">CABBIEO Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Control Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Cab Booking Section */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
          🚕 Cab Booking
        </p>
        {cabBookingItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}

        <Separator className="my-4" />

        {/* Package Booking Section */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
          🪑 Package Seats
        </p>
        {packageItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <BookingsSection />;
      case "drivers":
        return <DriversSection />;
      case "pricing":
        return <PricingSection />;
      case "pkg-routes":
        return <PackageRoutesSection />;
      case "pkg-pickup":
        return <PickupPointsSection />;
      case "pkg-vehicles":
        return <PackageVehiclesSection />;
      case "pkg-packages":
        return <PackagesSection />;
      case "pkg-bookings":
        return <PackageBookingsSection />;
      default:
        return <BookingsSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">CABBIEO Admin</h1>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="container mx-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
