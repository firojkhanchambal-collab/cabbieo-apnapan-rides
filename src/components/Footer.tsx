import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="animate-fade-in">
            <h3 className="font-poppins font-bold text-3xl mb-4 text-accent">
              CABBIEO
            </h3>
            <p className="text-white/80 mb-4 leading-relaxed">
              Har Safar Mein Apnapan
            </p>
            <p className="text-sm text-white/70">
              Your trusted local & outstation ride partner across Chambal region
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/alternatives/cabbieo-alternatives" className="text-white/80 hover:text-accent transition-colors">
                  Alternatives
                </Link>
              </li>
              <li>
                <Link to="/faq/cabbieo" className="text-white/80 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/80 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-white/80 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/solutions/cabbieo" className="text-white/80 hover:text-accent transition-colors">
                  Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-white/80">
              <li>Local E-Rickshaw Rides</li>
              <li>Bike Rides</li>
              <li>Car/Cab Bookings</li>
              <li>Outstation Trips</li>
              <li>Ambulance Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <a href="tel:011-69652647" className="hover:text-accent transition-colors block">
                    📞 Call Center: 011-69652647
                  </a>
                  <a href="tel:+919422799905" className="hover:text-accent transition-colors block mt-1">
                    📱 Booking: +91 94227 99905
                  </a>
                  <a href="https://wa.me/918109185295" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors block mt-1">
                    💬 WhatsApp: +91 81091 85295
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="mailto:support@cabbieo.com" className="text-white/80 hover:text-accent transition-colors">
                  support@cabbieo.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  Gwalior, Madhya Pradesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/Cabbieo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-all hover:scale-110 shadow-glow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/cabbieollp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-all hover:scale-110 shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@CABBIEO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition-all hover:scale-110 shadow-glow"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-white/70 text-sm">
              © {currentYear} CABBIEO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;