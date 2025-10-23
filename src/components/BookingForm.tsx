import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Phone, Car, Bike, Truck, Ambulance, Navigation } from "lucide-react";
import { toast } from "sonner";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    rideType: "",
    date: "",
    time: "",
    phone: "",
  });

  const rideTypes = [
    { value: "rickshaw", label: "E-Rickshaw", icon: Navigation },
    { value: "bike", label: "Bike", icon: Bike },
    { value: "car", label: "Car/Cab", icon: Car },
    { value: "outstation", label: "Outstation", icon: Truck },
    { value: "ambulance", label: "Ambulance", icon: Ambulance },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    toast.success("बुकिंग रिक्वेस्ट प्राप्त हुई! हम जल्द ही आपसे संपर्क करेंगे।");
    
    // Here you would typically send the booking data to your backend
    console.log("Booking data:", formData);
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
                    Phone Number
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

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-primary hover:opacity-90 font-poppins font-semibold text-lg py-6 shadow-primary"
              >
                Confirm Booking
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Or call us directly at{" "}
                <a href="tel:+919876543210" className="text-primary hover:underline font-semibold">
                  +91 98765 43210
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