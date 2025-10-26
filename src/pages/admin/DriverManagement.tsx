import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Truck
} from "lucide-react";

interface Driver {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  region: string;
  vehicle_type: string;
  vehicle_number: string;
  license_number: string;
  status: string;
  rejection_reason: string | null;
  created_at: string;
}

const DriverManagement = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDrivers();
      setupRealtimeSubscription();
    }
  }, [isAdmin]);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("drivers-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "drivers",
        },
        () => {
          fetchDrivers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleApprove = async (driverId: string) => {
    try {
      const { error } = await supabase
        .from("drivers")
        .update({ status: "approved", rejection_reason: null })
        .eq("id", driverId);

      if (error) throw error;
      toast.success("Driver approved successfully");
    } catch (error: any) {
      toast.error("Failed to approve driver");
    }
  };

  const handleReject = async () => {
    if (!selectedDriver || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      const { error } = await supabase
        .from("drivers")
        .update({ 
          status: "rejected", 
          rejection_reason: rejectionReason 
        })
        .eq("id", selectedDriver.id);

      if (error) throw error;
      toast.success("Driver rejected");
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedDriver(null);
    } catch (error: any) {
      toast.error("Failed to reject driver");
    }
  };

  const openRejectDialog = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowRejectDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      pending: { color: "bg-yellow-500", icon: Clock },
      approved: { color: "bg-green-500", icon: CheckCircle },
      rejected: { color: "bg-red-500", icon: XCircle },
    };

    const { color, icon: Icon } = variants[status] || variants.pending;

    return (
      <Badge className={`${color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getStatusCounts = () => {
    return {
      total: drivers.length,
      pending: drivers.filter((d) => d.status === "pending").length,
      approved: drivers.filter((d) => d.status === "approved").length,
      rejected: drivers.filter((d) => d.status === "rejected").length,
    };
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = getStatusCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
              <p className="text-muted-foreground mt-1">Manage driver registrations and verifications</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-lg border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Drivers</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-10 w-10 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drivers List */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle>Driver Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {drivers.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No driver applications yet
              </p>
            ) : (
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <Card key={driver.id} className="border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{driver.full_name}</h3>
                            {getStatusBadge(driver.status)}
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              {driver.phone}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              {driver.email}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span className="capitalize">{driver.region}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Truck className="h-4 w-4" />
                              <span className="capitalize">{driver.vehicle_type}</span>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Vehicle No:</span>{" "}
                              <span className="font-medium">{driver.vehicle_number}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">License:</span>{" "}
                              <span className="font-medium">{driver.license_number}</span>
                            </div>
                          </div>

                          {driver.rejection_reason && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                              <p className="text-xs font-semibold text-destructive mb-1">
                                Rejection Reason:
                              </p>
                              <p className="text-xs text-destructive/80">
                                {driver.rejection_reason}
                              </p>
                            </div>
                          )}
                        </div>

                        {driver.status === "pending" && (
                          <div className="flex md:flex-col gap-2">
                            <Button
                              onClick={() => handleApprove(driver.id)}
                              className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => openRejectDialog(driver)}
                              variant="destructive"
                              className="flex-1 md:flex-none"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Driver Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting {selectedDriver?.full_name}'s application.
            </p>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverManagement;
