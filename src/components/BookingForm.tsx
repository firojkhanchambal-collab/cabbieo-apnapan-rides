import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Car, Bike, Truck, Ambulance, Navigation, MessageCircle, PhoneCall, DollarSign, Sparkles, Check, Clock, Loader2, ArrowRight } from "lucide-react";
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
    <section id="booking" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            Book in 60 Seconds!
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            🚗 Book Your Ride Now!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fast, safe & affordable rides at your fingertips ✨
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl animate-slide-up border-2 border-primary/20 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          {/* Animated Header Strip */}
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Ride Type Selection - Playful Cards */}
              <div className="space-y-4">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary animate-bounce" />
                  Choose Your Ride
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {rideTypes.map((type, index) => {
                    const Icon = type.icon;
                    const isSelected = formData.rideType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, rideType: type.value })}
                        className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:-rotate-2 ${
                          isSelected
                            ? "border-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30"
                            : "border-border bg-card hover:border-primary hover:shadow-lg"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-bounce">
                            <Check className="w-4 h-4 text-accent-foreground" />
                          </div>
                        )}
                        <Icon className={`w-8 h-8 mx-auto mb-2 transition-transform group-hover:scale-125 ${isSelected ? '' : 'group-hover:text-primary'}`} />
                        <span className="text-sm font-bold block">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Fields - Fancy Design */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 group">
                  <Label htmlFor="pickup" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-primary/10 rounded-lg group-focus-within:bg-primary group-focus-within:text-primary-foreground transition-colors">
                      <MapPin className="w-4 h-4 text-primary group-focus-within:text-primary-foreground" />
                    </div>
                    Pickup Location *
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="📍 Where should we pick you up?"
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="text-base h-14 rounded-xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all pl-4"
                    required
                  />
                </div>

                <div className="space-y-3 group">
                  <Label htmlFor="drop" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-accent/10 rounded-lg group-focus-within:bg-accent transition-colors">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    Drop Location *
                  </Label>
                  <Input
                    id="drop"
                    placeholder="🎯 Where are you headed?"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="text-base h-14 rounded-xl border-2 focus:border-accent focus:ring-4 focus:ring-accent/20 transition-all pl-4"
                    required
                  />
                </div>
              </div>

              {/* Distance Input with Visual Feedback */}
              <div className="space-y-3">
                <Label htmlFor="distance" className="flex items-center gap-2 text-base font-semibold">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Navigation className="w-4 h-4 text-primary" />
                  </div>
                  अनुमानित दूरी (किलोमीटर) *
                </Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="🛣️ दूरी दर्ज करें (जैसे: 5.5)"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="text-base h-14 rounded-xl border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                  required
                />
                {estimatedFare && (
                  <div className="mt-4 p-5 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl border-2 border-primary/20 space-y-2 animate-fade-in">
                    <p className="text-base font-bold flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary animate-pulse" />
                      अनुमानित किराया: <span className="text-2xl text-primary">₹{estimatedFare}</span>
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-primary rounded-xl text-primary-foreground">
                      <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                      <span className="font-bold">Pay only ₹{advanceAmount} now!</span>
                      <span className="text-xs opacity-80">(20% advance)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Date, Time & Phone - Clean Layout */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="date" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-14 rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="time" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="h-14 rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="📱 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={10}
                    className="h-14 rounded-xl border-2 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-semibold">📝 Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="rounded-xl border-2 focus:border-primary resize-none"
                />
              </div>

              {/* Action Buttons - Eye-catching */}
              <div className="space-y-4 pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !advanceAmount}
                  className="w-full bg-gradient-to-r from-primary via-primary to-accent hover:opacity-90 font-poppins font-bold text-xl py-8 rounded-2xl shadow-xl shadow-primary/30 disabled:opacity-50 transition-all hover:scale-[1.02] hover:shadow-2xl group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                      Pay ₹{advanceAmount || 0} & Book Now!
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </Button>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleWhatsAppConfirmation}
                    className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold py-6 rounded-2xl transition-all hover:scale-105 group"
                  >
                    <MessageCircle className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                    WhatsApp Book
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold py-6 rounded-2xl transition-all hover:scale-105 group"
                  >
                    <a href={`tel:${CUSTOMER_CARE_PHONE}`}>
                      <PhoneCall className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                      Call to Book
                    </a>
                  </Button>
                </div>
              </div>

              {/* Footer Info */}
              <div className="text-center p-4 bg-muted/50 rounded-2xl">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    💡 20% advance only
                  </span>
                  <span>•</span>
                  <span>Customer Care:</span>
                  <a href={`tel:${CUSTOMER_CARE_PHONE}`} className="text-primary hover:underline font-bold">
                    {CUSTOMER_CARE_PHONE}
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
