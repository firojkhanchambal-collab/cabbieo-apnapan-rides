import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Phone, FileText, CheckCircle, XCircle, AlertCircle, UserCircle } from "lucide-react";

interface Driver {
  id: string;
  full_name: string;
  phone: string;
  vehicle_type: string;
  vehicle_number: string;
  status: string;
}

interface Booking {
  id: string;
  pickup_location: string;
  drop_location: string;
  ride_type: string;
  booking_date: string;
  booking_time: string;
  phone: string;
  additional_notes: string | null;
  status: string;
  created_at: string;
  assigned_driver_id: string | null;
}

export const BookingsSection = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
    setupRealtimeSubscription();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error("Bookings लोड नहीं हो पाईं: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .eq("status", "approved")
        .order("full_name");

      if (error) throw error;
      setDrivers(data || []);
    } catch (error: any) {
      toast.error("Drivers लोड नहीं हो पाए: " + error.message);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookings((prev) => [payload.new as Booking, ...prev]);
            toast.success("🎉 नई booking आई!");
          } else if (payload.eventType === "UPDATE") {
            setBookings((prev) =>
              prev.map((booking) =>
                booking.id === payload.new.id ? (payload.new as Booking) : booking
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

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("✅ Status अपडेट हो गया!");
    } catch (error: any) {
      toast.error("Status अपडेट नहीं हो पाया: " + error.message);
    }
  };

  const assignDriver = async (bookingId: string, driverId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ 
          assigned_driver_id: driverId,
          status: "confirmed"
        })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("✅ Driver assign हो गया!");
    } catch (error: any) {
      toast.error("Driver assign नहीं हो पाया: " + error.message);
    }
  };

  const autoAssignDriver = async (bookingId: string) => {
    try {
      // Get available drivers (approved and not currently assigned to pending bookings)
      const { data: availableDrivers, error: driverError } = await supabase
        .from("drivers")
        .select("id")
        .eq("status", "approved");

      if (driverError) throw driverError;

      if (!availableDrivers || availableDrivers.length === 0) {
        toast.error("कोई available driver नहीं है");
        return;
      }

      // Randomly assign one of the available drivers
      const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
      
      await assignDriver(bookingId, randomDriver.id);
    } catch (error: any) {
      toast.error("Auto-assign नहीं हो पाया: " + error.message);
    }
  };

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return "Not Assigned";
    const driver = drivers.find(d => d.id === driverId);
    return driver ? `${driver.full_name} (${driver.vehicle_type})` : "Unknown Driver";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusCounts = () => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    return { total, pending, confirmed, completed };
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
        <h2 className="text-3xl font-bold text-foreground mb-2">Bookings Management</h2>
        <p className="text-muted-foreground">सभी bookings को manage करें</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">कुल Bookings</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">अभी तक कोई booking नहीं है</p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Pickup:</p>
                        <p className="text-muted-foreground">{booking.pickup_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Drop:</p>
                        <p className="text-muted-foreground">{booking.drop_location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <p className="text-foreground">{booking.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <p className="text-foreground">{booking.booking_date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <p className="text-foreground">{booking.booking_time}</p>
                    </div>
                    {booking.additional_notes && (
                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Notes:</p>
                          <p className="text-muted-foreground">{booking.additional_notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className={`px-4 py-2 rounded-lg border text-center font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </div>

                    {/* Driver Assignment Section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserCircle className="w-4 h-4 text-primary" />
                        <span className="font-medium">{getDriverName(booking.assigned_driver_id)}</span>
                      </div>
                      
                      <Select 
                        value={booking.assigned_driver_id || ""} 
                        onValueChange={(value) => assignDriver(booking.id, value)}
                      >
                        <SelectTrigger className="w-full lg:w-[200px]">
                          <SelectValue placeholder="Driver चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                          {drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id}>
                              {driver.full_name} - {driver.vehicle_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => autoAssignDriver(booking.id)}
                        className="w-full lg:w-[200px]"
                      >
                        Auto-Assign Driver
                      </Button>
                    </div>

                    {/* Status Update Section */}
                    <Select value={booking.status} onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                      <SelectTrigger className="w-full lg:w-[200px]">
                        <SelectValue placeholder="Status बदलें" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Pending
                          </div>
                        </SelectItem>
                        <SelectItem value="confirmed">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Confirmed
                          </div>
                        </SelectItem>
                        <SelectItem value="completed">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </div>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Cancelled
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
