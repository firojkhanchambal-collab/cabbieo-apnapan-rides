import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Users, Menu, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { BookingsSection } from "./BookingsSection";
import { DriversSection } from "./DriversSection";
import PricingSection from "./PricingSection";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, loading } = useAdminCheck();
  const [activeTab, setActiveTab] = useState<"bookings" | "drivers" | "pricing">(
    location.state?.section || "bookings"
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

  const navItems = [
    { id: "bookings" as const, label: "Bookings", icon: BookOpen },
    { id: "drivers" as const, label: "Drivers", icon: Users },
    { id: "pricing" as const, label: "Pricing", icon: DollarSign },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">CABBIEO Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Control Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
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
          {activeTab === "bookings" && <BookingsSection />}
          {activeTab === "drivers" && <DriversSection />}
          {activeTab === "pricing" && <PricingSection />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
