import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Sparkles, ArrowRight, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PackageCard from "./PackageCard";
import SeatMap from "./SeatMap";
import { useRazorpay } from "@/hooks/useRazorpay";

interface Route {
  id: string;
  name: string;
  stops: string[];
}

interface PickupPoint {
  id: string;
  name: string;
  address: string | null;
}

interface Package {
  id: string;
  departure_date: string;
  departure_time: string;
  return_date: string | null;
  return_time: string | null;
  base_price: number;
  window_seat_extra: number;
  middle_seat_discount: number;
  advance_percentage: number;
  total_seats: number;
  available_seats: number;
  is_women_only: boolean;
  tags: string[] | null;
  facilities_included: string[] | null;
  facilities_excluded: string[] | null;
  package_routes: {
    name: string;
    stops: string[];
  };
  package_vehicles: {
    name: string;
    vehicle_type: "sedan" | "premium_suv" | "tempo_traveller";
    total_seats: number;
  };
}

interface Seat {
  id: string;
  seat_number: string;
  seat_type: "window" | "middle" | "aisle" | "driver";
  seat_row: number;
  seat_col: number;
  price: number;
  status: "available" | "booked" | "blocked" | "selected";
  is_blocked: boolean;
}

const PackageBookingSection = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedPickupPoint, setSelectedPickupPoint] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSeatDetails, setSelectedSeatDetails] = useState<Seat[]>([]);
  
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    email: "",
    isWomenBooking: false,
    isFamilyBooking: false,
    notes: "",
  });
  
  const { isLoaded: isRazorpayLoaded } = useRazorpay();

  useEffect(() => {
    fetchRoutes();
    fetchPickupPoints();
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      fetchPackages();
    }
  }, [selectedRoute]);

  useEffect(() => {
    if (selectedPackage) {
      fetchSeats();
    }
  }, [selectedPackage]);

  const fetchRoutes = async () => {
    const { data, error } = await supabase
      .from("package_routes")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (!error && data) {
      setRoutes(data);
    }
  };

  const fetchPickupPoints = async () => {
    const { data, error } = await supabase
      .from("pickup_points")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (!error && data) {
      setPickupPoints(data);
    }
  };

  const fetchPackages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("packages")
      .select(`
        *,
        package_routes(name, stops),
        package_vehicles(name, vehicle_type, total_seats)
      `)
      .eq("route_id", selectedRoute)
      .eq("is_active", true)
      .gte("departure_date", new Date().toISOString().split("T")[0])
      .order("departure_date");

    if (!error && data) {
      setPackages(data as unknown as Package[]);
    }
    setIsLoading(false);
  };

  const fetchSeats = async () => {
    if (!selectedPackage) return;
    
    const { data, error } = await supabase
      .from("package_seats")
      .select("*")
      .eq("package_id", selectedPackage.id)
      .order("seat_row")
      .order("seat_col");

    if (!error && data) {
      setSeats(data as Seat[]);
    }
  };

  const handleSeatSelect = (seatId: string, seat: Seat) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        setSelectedSeatDetails(details => details.filter(s => s.id !== seatId));
        return prev.filter(id => id !== seatId);
      } else {
        setSelectedSeatDetails(details => [...details, seat]);
        return [...prev, seatId];
      }
    });
  };

  const calculateTotal = () => {
    return selectedSeatDetails.reduce((sum, seat) => sum + seat.price, 0);
  };

  const calculateAdvance = () => {
    if (!selectedPackage) return 0;
    const total = calculateTotal();
    return Math.round((total * selectedPackage.advance_percentage) / 100);
  };

  const handleBookingSubmit = async () => {
    if (!selectedPackage || selectedSeats.length === 0) {
      toast.error("कृपया सीटें चुनें");
      return;
    }

    if (!customerForm.name || !customerForm.phone) {
      toast.error("कृपया नाम और फोन नंबर दर्ज करें");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(customerForm.phone)) {
      toast.error("कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें");
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error("Payment gateway loading...");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalAmount = calculateTotal();
      const advanceAmount = calculateAdvance();

      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            amount: advanceAmount,
            currency: 'INR',
            receipt: `pkg_${Date.now()}`,
            notes: {
              package_id: selectedPackage.id,
              seats: selectedSeats.length,
            },
          },
        }
      );

      if (orderError) throw orderError;

      const options = {
        key: orderData.key_id,
        amount: advanceAmount * 100,
        currency: 'INR',
        name: 'CABBIEO Package Booking',
        description: `${selectedPackage.package_routes.name} - ${selectedSeats.length} seat(s)`,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          await createBooking(response, orderData.order.id, totalAmount, advanceAmount);
        },
        prefill: {
          contact: customerForm.phone,
          email: customerForm.email || undefined,
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const createBooking = async (
    paymentResponse: any,
    orderId: string,
    totalAmount: number,
    advanceAmount: number
  ) => {
    try {
      // Create booking
      const bookingPayload = {
        package_id: selectedPackage!.id,
        pickup_point_id: selectedPickupPoint || null,
        customer_name: customerForm.name,
        customer_phone: customerForm.phone,
        customer_email: customerForm.email || null,
        total_amount: totalAmount,
        advance_amount: advanceAmount,
        paid_amount: advanceAmount,
        booking_status: "confirmed" as "pending" | "confirmed" | "cancelled" | "completed",
        payment_status: (advanceAmount >= totalAmount ? "paid" : "partial") as "pending" | "partial" | "paid" | "refunded",
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        is_women_booking: customerForm.isWomenBooking,
        is_family_booking: customerForm.isFamilyBooking,
        notes: customerForm.notes || null,
        booking_id: `CB${Date.now()}`,
      };

      const { data: bookingData, error: bookingError } = await supabase
        .from("package_bookings")
        .insert(bookingPayload)
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create booked seats
      const bookedSeatsData = selectedSeats.map((seatId) => ({
        booking_id: bookingData.id,
        seat_id: seatId,
      }));

      const { error: seatsError } = await supabase
        .from("package_booked_seats")
        .insert(bookedSeatsData);

      if (seatsError) throw seatsError;

      toast.success(
        `✅ बुकिंग कन्फर्म!\n\nBooking ID: ${bookingData.booking_id}\n💰 Paid: ₹${advanceAmount}\n🪑 Seats: ${selectedSeats.length}\n\nहम जल्द ही आपसे संपर्क करेंगे।`,
        { duration: 10000 }
      );

      // Reset state
      setShowBookingDialog(false);
      setSelectedPackage(null);
      setSelectedSeats([]);
      setSelectedSeatDetails([]);
      setCustomerForm({
        name: "",
        phone: "",
        email: "",
        isWomenBooking: false,
        isFamilyBooking: false,
        notes: "",
      });
      fetchPackages();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Special Package Yatra
        </div>
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-2">
          🪑 Book Your Seat
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          अब पूरी गाड़ी नहीं — सिर्फ अपनी सीट बुक करें
          <br />
          Khatu Shyam | Vrindavan | Govardhan
        </p>
      </div>

      {/* Route & Pickup Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Route Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <MapPin className="w-4 h-4 text-primary" />
                Select Route
              </Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your destination..." />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pickup Point Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Pickup Point
              </Label>
              <Select value={selectedPickupPoint} onValueChange={setSelectedPickupPoint}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pickup location..." />
                </SelectTrigger>
                <SelectContent>
                  {pickupPoints.map((point) => (
                    <SelectItem key={point.id} value={point.id}>
                      {point.name}
                      {point.address && (
                        <span className="text-muted-foreground ml-1 text-xs">
                          ({point.address})
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Packages */}
      {selectedRoute && (
        <div className="space-y-4">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Available Packages
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : packages.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No packages available for this route.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelect={(p) => {
                    setSelectedPackage(p);
                    setSelectedSeats([]);
                    setSelectedSeatDetails([]);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seat Selection Dialog */}
      <Dialog 
        open={!!selectedPackage} 
        onOpenChange={(open) => !open && setSelectedPackage(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Select Your Seats - {selectedPackage?.package_routes.name}
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-6">
              {/* Seat Map */}
              <SeatMap
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
                isWomenOnly={selectedPackage.is_women_only}
                vehicleType={selectedPackage.package_vehicles.vehicle_type}
              />

              {/* Pricing Summary */}
              {selectedSeats.length > 0 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Selected Seats ({selectedSeats.length})</span>
                      <span className="font-medium">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Advance ({selectedPackage.advance_percentage}%)</span>
                      <span className="font-medium text-primary">₹{calculateAdvance()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Pay Now</span>
                      <span className="text-primary text-lg">₹{calculateAdvance()}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Continue Button */}
              <Button
                className="w-full"
                size="lg"
                disabled={selectedSeats.length === 0}
                onClick={() => setShowBookingDialog(true)}
              >
                Continue to Booking <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customer Details Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="10 digit mobile number"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="women"
                checked={customerForm.isWomenBooking}
                onCheckedChange={(checked) => 
                  setCustomerForm({ ...customerForm, isWomenBooking: !!checked })
                }
              />
              <Label htmlFor="women" className="text-sm">
                👩 Women-only seating preference
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="family"
                checked={customerForm.isFamilyBooking}
                onCheckedChange={(checked) => 
                  setCustomerForm({ ...customerForm, isFamilyBooking: !!checked })
                }
              />
              <Label htmlFor="family" className="text-sm">
                👨‍👩‍👧 Family booking (group seats together)
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requests..."
                value={customerForm.notes}
                onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })}
              />
            </div>

            {/* Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Seats</span>
                  <span>{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between font-bold text-primary">
                  <span>Pay Now</span>
                  <span>₹{calculateAdvance()}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleBookingSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${calculateAdvance()} & Confirm Booking`
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageBookingSection;
