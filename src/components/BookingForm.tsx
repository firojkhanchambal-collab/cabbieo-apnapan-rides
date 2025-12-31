import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Navigation, MessageCircle, PhoneCall, DollarSign, Sparkles, Check, Clock, Loader2, ArrowRight, Route, Timer } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useMapboxDistance } from "@/hooks/useMapboxDistance";
import { BikeIcon, ERickshawIcon, OutstationIcon, AmbulanceIcon } from "@/components/icons/VehicleIcons";

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
  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  
  const { isLoaded: isRazorpayLoaded } = useRazorpay();
  const { 
    calculateDistance, 
    getAddressSuggestions, 
    suggestions, 
    clearSuggestions 
  } = useMapboxDistance(mapboxToken);

  const CUSTOMER_CARE_PHONE = "+919876543210";

  const rideTypes = [
    { value: "bike", label: "Bike", icon: BikeIcon, color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-300", price: "₹19" },
    { value: "auto", label: "E-Rickshaw", icon: ERickshawIcon, color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-50", borderColor: "border-blue-300", price: "₹29" },
    { value: "outstation", label: "Outstation", icon: OutstationIcon, color: "from-violet-500 to-purple-600", bgColor: "bg-violet-50", borderColor: "border-violet-300", price: "₹99" },
    { value: "ambulance", label: "Ambulance", icon: AmbulanceIcon, color: "from-red-500 to-rose-600", bgColor: "bg-red-50", borderColor: "border-red-300", price: "₹999" },
  ];

  useEffect(() => {
    fetchPricing();
    // Check for Mapbox token in localStorage or prompt user
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    calculateFare();
  }, [formData.rideType, formData.distance, pricing]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setShowDropSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    const advance = Math.round(fare * 0.2);

    setEstimatedFare(fare);
    setAdvanceAmount(advance);
  };

  // Auto-calculate distance when both locations are filled
  const handleCalculateDistance = useCallback(async () => {
    if (!formData.pickup || !formData.drop || !mapboxToken) return;
    
    setIsCalculatingDistance(true);
    const result = await calculateDistance(formData.pickup, formData.drop);
    setIsCalculatingDistance(false);
    
    if (result) {
      setFormData(prev => ({ ...prev, distance: result.distance.toString() }));
      setEstimatedDuration(result.duration);
      toast.success(`Distance: ${result.distance} km | ETA: ${result.duration} mins`);
    }
  }, [formData.pickup, formData.drop, mapboxToken, calculateDistance]);

  // Debounced address suggestions
  const handlePickupChange = async (value: string) => {
    setFormData(prev => ({ ...prev, pickup: value }));
    if (mapboxToken && value.length >= 3) {
      await getAddressSuggestions(value, 'pickup');
      setShowPickupSuggestions(true);
    }
  };

  const handleDropChange = async (value: string) => {
    setFormData(prev => ({ ...prev, drop: value }));
    if (mapboxToken && value.length >= 3) {
      await getAddressSuggestions(value, 'drop');
      setShowDropSuggestions(true);
    }
  };

  const selectPickupSuggestion = (placeName: string) => {
    setFormData(prev => ({ ...prev, pickup: placeName }));
    setShowPickupSuggestions(false);
    clearSuggestions('pickup');
  };

  const selectDropSuggestion = (placeName: string) => {
    setFormData(prev => ({ ...prev, drop: placeName }));
    setShowDropSuggestions(false);
    clearSuggestions('drop');
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
      setEstimatedDuration(null);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Payment verification failed. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone || !formData.distance) {
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें");
      return;
    }

    await handlePayment();
  };

  const handleWhatsAppConfirmation = () => {
    if (!formData.pickup || !formData.drop || !formData.rideType || !formData.phone) {
      toast.error("कृपया पहले फॉर्म भरें");
      return;
    }

    const rideLabel = rideTypes.find(r => r.value === formData.rideType)?.label || formData.rideType;

    const message = `Hello CABBIEO 👋
I'd like to book a ride.
🚗 Ride Type: ${rideLabel}
📍 Pickup: ${formData.pickup}
🎯 Drop: ${formData.drop}
${formData.distance ? `📏 Distance: ${formData.distance} km` : ''}
${estimatedDuration ? `⏱️ ETA: ${estimatedDuration} mins` : ''}
${estimatedFare ? `💰 Estimated Fare: ₹${estimatedFare}` : ''}
📅 Date & Time: ${formData.date || 'ASAP'} ${formData.time || ''}
📞 Contact: ${formData.phone}
${formData.notes ? `📝 Notes: ${formData.notes}` : ''}`;

    const whatsappUrl = `https://wa.me/${CUSTOMER_CARE_PHONE.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSaveMapboxToken = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    setMapboxToken(token);
    toast.success('Mapbox token saved!');
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
            Bike, E-Rickshaw, Outstation & Ambulance - Fast, safe & affordable rides at your fingertips ✨
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl animate-slide-up border-2 border-primary/20 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
          
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Ride Type Selection - Colorful Cards */}
              <div className="space-y-4">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Choose Your Ride
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {rideTypes.map((type, index) => {
                    const Icon = type.icon;
                    const isSelected = formData.rideType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, rideType: type.value })}
                        className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? `${type.borderColor} bg-gradient-to-br ${type.color} text-white shadow-lg`
                            : `border-border ${type.bgColor} hover:${type.borderColor} hover:shadow-lg`
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center animate-bounce shadow-lg">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                        <Icon className="w-12 h-12 mx-auto mb-3 transition-transform group-hover:scale-110" />
                        <span className={`text-sm font-bold block ${isSelected ? 'text-white' : 'text-foreground'}`}>
                          {type.label}
                        </span>
                        <span className={`text-xs mt-1 block ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                          from {type.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mapbox Token Input (if not set) */}
              {!mapboxToken && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <Label className="text-sm font-semibold text-amber-800 mb-2 block">
                    🗺️ Enable Auto Distance Calculation
                  </Label>
                  <p className="text-xs text-amber-700 mb-3">
                    Enter your Mapbox public token to automatically calculate distance. Get one free at{' '}
                    <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">
                      mapbox.com
                    </a>
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="pk.ey..."
                      className="flex-1 text-sm"
                      onBlur={(e) => e.target.value && handleSaveMapboxToken(e.target.value)}
                    />
                    <Button type="button" size="sm" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              )}

              {/* Location Fields with Autocomplete */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 group relative" ref={pickupRef}>
                  <Label htmlFor="pickup" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    Pickup Location *
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="📍 Where should we pick you up?"
                    value={formData.pickup}
                    onChange={(e) => handlePickupChange(e.target.value)}
                    onFocus={() => suggestions.pickup.length > 0 && setShowPickupSuggestions(true)}
                    className="text-base h-14 rounded-xl border-2 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all pl-4"
                    required
                    autoComplete="off"
                  />
                  {/* Pickup Suggestions Dropdown */}
                  {showPickupSuggestions && suggestions.pickup.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl border shadow-xl max-h-60 overflow-y-auto">
                      {suggestions.pickup.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 border-b last:border-b-0 text-sm"
                          onClick={() => selectPickupSuggestion(suggestion.place_name)}
                        >
                          <MapPin className="w-4 h-4 inline mr-2 text-muted-foreground" />
                          {suggestion.place_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3 group relative" ref={dropRef}>
                  <Label htmlFor="drop" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-rose-600" />
                    </div>
                    Drop Location *
                  </Label>
                  <Input
                    id="drop"
                    placeholder="🎯 Where are you headed?"
                    value={formData.drop}
                    onChange={(e) => handleDropChange(e.target.value)}
                    onFocus={() => suggestions.drop.length > 0 && setShowDropSuggestions(true)}
                    className="text-base h-14 rounded-xl border-2 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 transition-all pl-4"
                    required
                    autoComplete="off"
                  />
                  {/* Drop Suggestions Dropdown */}
                  {showDropSuggestions && suggestions.drop.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl border shadow-xl max-h-60 overflow-y-auto">
                      {suggestions.drop.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 border-b last:border-b-0 text-sm"
                          onClick={() => selectDropSuggestion(suggestion.place_name)}
                        >
                          <MapPin className="w-4 h-4 inline mr-2 text-muted-foreground" />
                          {suggestion.place_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Auto Calculate Distance Button */}
              {mapboxToken && formData.pickup && formData.drop && (
                <Button
                  type="button"
                  onClick={handleCalculateDistance}
                  disabled={isCalculatingDistance}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold"
                >
                  {isCalculatingDistance ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculating Distance...
                    </>
                  ) : (
                    <>
                      <Route className="w-5 h-5 mr-2" />
                      Auto Calculate Distance & Fare
                    </>
                  )}
                </Button>
              )}

              {/* Distance & Duration Display */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="distance" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Route className="w-4 h-4 text-blue-600" />
                    </div>
                    Estimated Distance (km) *
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="🛣️ Distance in km"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    className="text-base h-14 rounded-xl border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>

                {estimatedDuration && (
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-semibold">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Timer className="w-4 h-4 text-amber-600" />
                      </div>
                      Estimated Time
                    </Label>
                    <div className="h-14 rounded-xl border-2 border-amber-200 bg-amber-50 flex items-center px-4 text-lg font-semibold text-amber-700">
                      ⏱️ {estimatedDuration} minutes
                    </div>
                  </div>
                )}
              </div>

              {/* Fare Display */}
              {estimatedFare && (
                <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl border-2 border-primary/20 space-y-3 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-base font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary animate-pulse" />
                        Estimated Fare
                      </p>
                      <p className="text-3xl font-bold text-primary">₹{estimatedFare}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-bold">Pay only ₹{advanceAmount} now!</span>
                      </div>
                      <span className="text-xs opacity-80">(20% advance booking)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date, Time & Phone */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="date" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-14 rounded-xl border-2 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="time" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Clock className="w-4 h-4 text-indigo-600" />
                    </div>
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="h-14 rounded-xl border-2 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Phone className="w-4 h-4 text-teal-600" />
                    </div>
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="📱 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="h-14 rounded-xl border-2 focus:border-teal-500"
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-base font-semibold">
                  📝 Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions? (e.g., landmark, accessibility needs)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="rounded-xl border-2 focus:border-primary min-h-[80px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.pickup || !formData.drop || !formData.rideType || !formData.phone || !formData.distance}
                  className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:right_center] text-white py-6 text-lg rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                      Book Now & Pay ₹{advanceAmount || '---'} Advance
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleWhatsAppConfirmation}
                    className="h-14 rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Book via WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.href = `tel:${CUSTOMER_CARE_PHONE}`}
                    className="h-14 rounded-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold group"
                  >
                    <PhoneCall className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Call to Book
                  </Button>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Safe & Secure Payments | 24/7 Support | GPS Tracked Rides</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
