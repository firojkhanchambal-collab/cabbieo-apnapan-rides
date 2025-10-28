import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, User, Phone, Mail, Car, MapPin, AlertCircle } from "lucide-react";

interface Driver {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  vehicle_type: string;
  vehicle_number: string;
  license_number: string;
  region: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason: string | null;
  created_at: string;
}

export const DriversSection = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchDrivers();
    setupRealtimeSubscription();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error: any) {
      toast.error("Drivers लोड नहीं हो पाए: " + error.message);
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
        (payload) => {
          if (payload.eventType === "INSERT") {
            setDrivers((prev) => [payload.new as Driver, ...prev]);
            toast.success("🎉 नया driver registration!");
          } else if (payload.eventType === "UPDATE") {
            setDrivers((prev) =>
              prev.map((driver) =>
                driver.id === payload.new.id ? (payload.new as Driver) : driver
              )
            );
          }
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
      toast.success("✅ Driver approved!");
    } catch (error: any) {
      toast.error("Approve नहीं हो पाया: " + error.message);
    }
  };

  const handleReject = async () => {
    if (!selectedDriver || !rejectionReason.trim()) {
      toast.error("कृपया rejection reason दें");
      return;
    }

    try {
      const { error } = await supabase
        .from("drivers")
        .update({ status: "rejected", rejection_reason: rejectionReason })
        .eq("id", selectedDriver.id);

      if (error) throw error;
      toast.success("Driver rejected");
      setRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedDriver(null);
    } catch (error: any) {
      toast.error("Reject नहीं हो पाया: " + error.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusCounts = () => {
    const total = drivers.length;
    const pending = drivers.filter((d) => d.status === "pending").length;
    const approved = drivers.filter((d) => d.status === "approved").length;
    const rejected = drivers.filter((d) => d.status === "rejected").length;
    return { total, pending, approved, rejected };
  };

  const stats = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Driver Management</h2>
        <p className="text-muted-foreground">सभी driver applications को manage करें</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">कुल Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {drivers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">अभी तक कोई driver registration नहीं है</p>
            </CardContent>
          </Card>
        ) : (
          drivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{driver.full_name}</h3>
                      </div>
                      {getStatusBadge(driver.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-foreground">{driver.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-foreground">{driver.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-foreground">
                          {driver.vehicle_type} - {driver.vehicle_number}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-foreground">{driver.region}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">License: {driver.license_number}</p>
                    </div>

                    {driver.rejection_reason && (
                      <div className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                          <p className="text-sm text-red-700">{driver.rejection_reason}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {driver.status === "pending" && (
                    <div className="flex flex-col gap-2 lg:w-40">
                      <Button
                        onClick={() => handleApprove(driver.id)}
                        className="w-full"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedDriver(driver);
                          setRejectDialogOpen(true);
                        }}
                        variant="destructive"
                        className="w-full"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver को Reject करें</DialogTitle>
            <DialogDescription>
              कृपया rejection का reason दें। यह driver को दिखेगा।
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="कारण बताएं..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
