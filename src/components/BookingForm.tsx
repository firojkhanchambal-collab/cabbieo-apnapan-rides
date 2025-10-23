import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Car, Bike, Truck, Ambulance, Navigation, MessageCircle, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    rideType: "",
    date: "",
    time: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CUSTOMER_CARE_PHONE = "+919876543210";

  const rideTypes = [
    { value: "rickshaw", label: "E-Rickshaw", icon: Navigation },
    { value: "bike", label: "Bike", icon: Bike },
    { value: "car", label: "Car/Cab", icon: Car },
    { value: "outstation", label: "Outstation", icon: Truck },
    { value: "ambulance", label: "Ambulance", icon: Ambulance },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    // Validate phone number (10 digits, India format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save booking to database
      const { error } = await supabase.from("bookings").insert({
        pickup_location: formData.pickup,
        drop_location: formData.drop,
        ride_type: formData.rideType,
        booking_date: formData.date || null,
        booking_time: formData.time || null,
        phone: formData.phone,
        additional_notes: formData.notes || null,
      });

      if (error) throw error;

      toast.success("🎉 Ride Request Sent Successfully!");
      
      // Reset form
      setFormData({
        pickup: "",
        drop: "",
        rideType: "",
        date: "",
        time: "",
        phone: "",
        notes: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("बुकिंग में समस्या हुई। कृपया दोबारा प्रयास करें या हमें कॉल करें।");
    } finally {
      setIsSubmitting(false);
    }
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
            Simple, fast, and reliable booking for all your travel needs
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
                    Pickup Location
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drop" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Drop Location
                  </Label>
                  <Input
                    id="drop"
                    placeholder="Enter drop location"
                    value={formData.drop}
                    onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                    className="text-base"
                  />
                </div>
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
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 font-poppins font-semibold text-lg py-6 shadow-primary disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
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