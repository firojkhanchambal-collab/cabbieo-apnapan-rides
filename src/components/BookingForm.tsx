import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Car, Bike, Truck, Ambulance, Navigation, MessageCircle, PhoneCall, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRazorpay } from "@/hooks/useRazorpay";

interface PricingConfig {
  vehicle_type: string;
  rate_per_km: number;
  base_fare: number;
}

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    rideType: "",
    date: "",
    time: "",
    phone: "",
    notes: "",
    distance: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricing, setPricing] = useState<PricingConfig[]>([]);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [advanceAmount, setAdvanceAmount] = useState<number | null>(null);
  const { isLoaded: isRazorpayLoaded } = useRazorpay();

  const CUSTOMER_CARE_PHONE = "+919876543210";

  const rideTypes = [
    { value: "auto", label: "E-Rickshaw", icon: Navigation },
    { value: "bike", label: "Bike", icon: Bike },
    { value: "car", label: "Car/Cab", icon: Car },
    { value: "outstation", label: "Outstation", icon: Truck },
    { value: "suv", label: "SUV", icon: Ambulance },
  ];

  useEffect(() => {
    fetchPricing();
  }, []);

  useEffect(() => {
    calculateFare();
  }, [formData.rideType, formData.distance, pricing]);

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from("pricing_config")
        .select("*");

      if (error) throw error;
      setPricing(data || []);
    } catch (error) {
      console.error("Error fetching pricing:", error);
    }
  };

  const calculateFare = () => {
    if (!formData.rideType || !formData.distance) {
      setEstimatedFare(null);
      setAdvanceAmount(null);
      return;
    }

    const distance = parseFloat(formData.distance);
    if (isNaN(distance) || distance <= 0) {
      setEstimatedFare(null);
      setAdvanceAmount(null);
      return;
    }

    const config = pricing.find(p => p.vehicle_type === formData.rideType);
    if (!config) return;

    const fare = config.base_fare + (distance * config.rate_per_km);
    const advance = Math.round(fare * 0.2); // 20% advance

    setEstimatedFare(fare);
    setAdvanceAmount(advance);
  };

  const handlePayment = async () => {
    if (!advanceAmount || !estimatedFare) {
      toast.error("कृपया पहले दूरी दर्ज करें");
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error("Payment gateway loading...");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            amount: advanceAmount,
            currency: 'INR',
            receipt: `booking_${Date.now()}`,
            notes: {
              pickup: formData.pickup,
              drop: formData.drop,
              ride_type: formData.rideType,
            },
          },
        }
      );

      if (orderError) throw orderError;

      const options = {
        key: orderData.key_id,
        amount: advanceAmount * 100,
        currency: 'INR',
        name: 'CABBIEO',
        description: `Advance Payment - ${formData.rideType}`,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          await verifyPayment(response, orderData.order.id);
        },
        prefill: {
          contact: formData.phone,
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

  const verifyPayment = async (paymentResponse: any, orderId: string) => {
    try {
      // First create the booking
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          pickup_location: formData.pickup,
          drop_location: formData.drop,
          ride_type: formData.rideType,
          booking_date: formData.date || null,
          booking_time: formData.time || null,
          phone: formData.phone,
          additional_notes: formData.notes || null,
          distance_km: parseFloat(formData.distance),
          estimated_fare: estimatedFare,
          advance_amount: advanceAmount,
          razorpay_order_id: orderId,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Verify payment
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
        'verify-razorpay-payment',
        {
          body: {
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            booking_id: bookingData.id,
          },
        }
      );

      if (verifyError || !verifyData.verified) {
        throw new Error('Payment verification failed');
      }

      toast.success(
        `✅ बुकिंग कन्फर्म हो गई!\n\n💰 Advance Paid: ₹${advanceAmount}\n📊 Total Fare: ₹${estimatedFare}\n\nहम जल्द ही आपसे संपर्क करेंगे।`,
        { duration: 8000 }
      );

      // Reset form
      setFormData({
        pickup: "",
        drop: "",
        rideType: "",
        date: "",
        time: "",
        phone: "",
        notes: "",
        distance: "",
      });
      setEstimatedFare(null);
      setAdvanceAmount(null);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Payment verification failed. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone || !formData.distance) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    // Validate phone number (10 digits, India format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें");
      return;
    }

    // Proceed to payment
    await handlePayment();
  };

  const handleWhatsAppConfirmation = () => {
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone) {
      toast.error("कृपया पहले फॉर्म भरें");
      return;
    }

    const message = `Hello CABBIEO 👋
I'd like to book a ride.
Pickup: ${formData.pickup}
Drop: ${formData.drop}
Ride Type: ${formData.rideType}
${formData.distance ? `Distance: ${formData.distance} km` : ''}
${estimatedFare ? `Estimated Fare: ₹${estimatedFare}` : ''}
Date & Time: ${formData.date || 'ASAP'} ${formData.time || ''}
Contact: ${formData.phone}
${formData.notes ? `Notes: ${formData.notes}` : ''}`;

    const whatsappUrl = `https://wa.me/${CUSTOMER_CARE_PHONE.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="booking" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4">
            Book Your Ride
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, fast, and reliable booking with 20% advance payment
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-primary animate-slide-up">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ride Type Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {rideTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, rideType: type.value })}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        formData.rideType === type.value
                          ? "border-primary bg-primary text-primary-foreground shadow-glow"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Location Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Pickup Location *
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drop" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Drop Location *
                  </Label>
                  <Input
                    id="drop"
                    placeholder="Enter drop location"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="text-base"
                    required
                  />
                </div>
              </div>

              {/* Distance Input */}
              <div className="space-y-2">
                <Label htmlFor="distance" className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  अनुमानित दूरी (किलोमीटर) *
                </Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="दूरी दर्ज करें (जैसे: 5.5)"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="text-base"
                  required
                />
                {estimatedFare && (
                  <div className="mt-2 p-3 bg-primary/10 rounded-lg space-y-1">
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      अनुमानित किराया: ₹{estimatedFare}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      20% Advance Payment: ₹{advanceAmount}
                    </p>
                  </div>
                )}
              </div>

              {/* Date, Time & Phone */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !advanceAmount}
                  className="w-full bg-gradient-primary hover:opacity-90 font-poppins font-semibold text-lg py-6 shadow-primary disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : `Pay ₹${advanceAmount || 0} & Confirm Booking`}
                </Button>

                <div className="grid md:grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleWhatsAppConfirmation}
                    className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Confirmation
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full border-2 border-primary hover:bg-primary/5 font-semibold"
                  >
                    <a href={`tel:${CUSTOMER_CARE_PHONE}`}>
                      <PhoneCall className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                💡 20% advance payment required to confirm booking
                <br />
                Customer Care:{" "}
                <a href={`tel:${CUSTOMER_CARE_PHONE}`} className="text-primary hover:underline font-semibold">
                  {CUSTOMER_CARE_PHONE}
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
