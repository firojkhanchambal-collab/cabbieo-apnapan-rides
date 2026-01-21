import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket, Phone, MapPin, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookedSeat {
  id: string;
  passenger_name: string | null;
  passenger_gender: string | null;
  package_seats: {
    seat_number: string;
    seat_type: string;
  };
}

interface PackageBooking {
  id: string;
  booking_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  total_amount: number;
  advance_amount: number;
  paid_amount: number;
  booking_status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "partial" | "paid" | "refunded";
  is_women_booking: boolean;
  notes: string | null;
  created_at: string;
  packages: {
    departure_date: string;
    departure_time: string;
    package_routes: {
      name: string;
    };
    package_vehicles: {
      name: string;
    };
  };
  pickup_points: {
    name: string;
  } | null;
  package_booked_seats: BookedSeat[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  partial: "bg-orange-100 text-orange-800",
  paid: "bg-green-100 text-green-800",
  refunded: "bg-gray-100 text-gray-800",
};

export const PackageBookingsSection = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<PackageBooking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("package_bookings")
        .select(`
          *,
          packages(
            departure_date,
            departure_time,
            package_routes(name),
            package_vehicles(name)
          ),
          pickup_points(name),
          package_booked_seats(
            id,
            passenger_name,
            passenger_gender,
            package_seats(seat_number, seat_type)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings((data as unknown as PackageBooking[]) || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: "pending" | "confirmed" | "cancelled" | "completed") => {
    try {
      const { error } = await supabase
        .from("package_bookings")
        .update({ booking_status: status })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Booking status updated!");
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  const updatePaymentStatus = async (bookingId: string, status: string) => {
    try {
      const updates: any = { payment_status: status };
      
      // If marked as paid, update paid_amount to total
      const booking = bookings.find(b => b.id === bookingId);
      if (status === "paid" && booking) {
        updates.paid_amount = booking.total_amount;
      }

      const { error } = await supabase
        .from("package_bookings")
        .update(updates)
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Payment status updated!");
      fetchBookings();
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment");
    }
  };

  const filteredBookings = filterStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.booking_status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Package Bookings</h2>
          <p className="text-muted-foreground">Manage all package seat bookings</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {bookings.length === 0 ? (
        <Card className="p-12 text-center">
          <Ticket className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No bookings yet</p>
          <p className="text-sm text-muted-foreground mt-1">Bookings will appear here when customers book seats</p>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono font-semibold">
                    {booking.booking_id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {booking.customer_phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.packages?.package_routes?.name}</p>
                      {booking.pickup_points && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.pickup_points.name}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {booking.packages?.departure_date && 
                        format(new Date(booking.packages.departure_date), "dd MMM")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {booking.package_booked_seats?.map((seat) => (
                        <Badge key={seat.id} variant="outline" className="text-xs">
                          {seat.package_seats?.seat_number}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">₹{booking.total_amount}</p>
                      <p className="text-xs text-muted-foreground">
                        Paid: ₹{booking.paid_amount}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={booking.booking_status}
                      onValueChange={(v) => updateBookingStatus(booking.id, v as "pending" | "confirmed" | "cancelled" | "completed")}
                    >
                      <SelectTrigger className={`w-[120px] h-8 ${statusColors[booking.booking_status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={booking.payment_status}
                      onValueChange={(v) => updatePaymentStatus(booking.id, v)}
                    >
                      <SelectTrigger className={`w-[110px] h-8 ${paymentStatusColors[booking.payment_status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.booking_id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold">{selectedBooking.customer_name}</p>
                  <p className="text-sm">{selectedBooking.customer_phone}</p>
                  {selectedBooking.customer_email && (
                    <p className="text-sm">{selectedBooking.customer_email}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Route</p>
                  <p className="font-semibold">{selectedBooking.packages?.package_routes?.name}</p>
                  <p className="text-sm">{selectedBooking.packages?.package_vehicles?.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Departure</p>
                  <p className="font-semibold">
                    {selectedBooking.packages?.departure_date && 
                      format(new Date(selectedBooking.packages.departure_date), "dd MMM yyyy")}
                  </p>
                  <p className="text-sm">{selectedBooking.packages?.departure_time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Point</p>
                  <p className="font-semibold">
                    {selectedBooking.pickup_points?.name || "Not selected"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Booked Seats</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.package_booked_seats?.map((seat) => (
                    <Badge key={seat.id} variant="secondary">
                      Seat {seat.package_seats?.seat_number} 
                      ({seat.package_seats?.seat_type})
                      {seat.passenger_name && ` - ${seat.passenger_name}`}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-bold text-lg">₹{selectedBooking.total_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Advance</p>
                  <p className="font-semibold">₹{selectedBooking.advance_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="font-semibold text-green-600">₹{selectedBooking.paid_amount}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Booked on: {format(new Date(selectedBooking.created_at), "dd MMM yyyy, HH:mm")}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageBookingsSection;
