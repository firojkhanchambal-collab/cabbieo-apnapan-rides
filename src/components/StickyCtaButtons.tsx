import { Phone, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StickyCtaButtons = () => {
  const EMERGENCY_PHONE = "+919876543210";
  const WHATSAPP_PHONE = "919876543210";

  const handleEmergencyCall = () => {
    window.location.href = `tel:${EMERGENCY_PHONE}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("🚨 EMERGENCY! I need immediate ambulance assistance!");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, '_blank');
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sticky Right Sidebar */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
        {/* Emergency Ambulance Button */}
        <Button
          onClick={handleEmergencyCall}
          className="group relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-l-xl rounded-r-none px-4 py-6 shadow-2xl animate-pulse hover:animate-none transition-all duration-300 hover:pr-6"
          aria-label="Emergency Ambulance Call"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
            <span className="font-bold text-sm hidden group-hover:inline transition-all">EMERGENCY</span>
          </div>
        </Button>

        {/* Call Now Button */}
        <Button
          onClick={handleEmergencyCall}
          className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-l-xl rounded-r-none px-4 py-6 shadow-xl transition-all duration-300 hover:pr-6"
          aria-label="Call Now"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span className="font-bold text-sm hidden group-hover:inline transition-all">Call Now</span>
          </div>
        </Button>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          className="group bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-l-xl rounded-r-none px-4 py-6 shadow-xl transition-all duration-300 hover:pr-6"
          aria-label="WhatsApp"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-bold text-sm hidden group-hover:inline transition-all">WhatsApp</span>
          </div>
        </Button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around p-2 gap-2">
          {/* Emergency Button */}
          <Button
            onClick={handleEmergencyCall}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 rounded-xl shadow-lg"
            aria-label="Emergency Call"
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span className="font-bold text-xs">EMERGENCY</span>
            </div>
          </Button>

          {/* Book Now Button */}
          <Button
            onClick={scrollToBooking}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-3 rounded-xl shadow-lg"
            aria-label="Book Now"
          >
            <span className="font-bold text-xs">BOOK NOW</span>
          </Button>

          {/* Call Button */}
          <Button
            onClick={handleEmergencyCall}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-xl shadow-lg"
            aria-label="Call"
          >
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-bold text-xs">CALL</span>
            </div>
          </Button>

          {/* WhatsApp Button */}
          <Button
            onClick={handleWhatsApp}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3 rounded-xl shadow-lg"
            aria-label="WhatsApp"
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="font-bold text-xs">CHAT</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default StickyCtaButtons;
