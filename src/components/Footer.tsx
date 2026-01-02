import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart, Car, Ambulance } from "lucide-react";
import { Link } from "react-router-dom";
import cabbieoLogo from "@/assets/cabbieo-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="animate-fade-in space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src={cabbieoLogo} 
                alt="Cabbieo Logo" 
                className="w-14 h-14 object-contain"
              />
              <h3 className="font-poppins font-bold text-3xl text-accent">
                CABBIEO
              </h3>
            </div>
            
            <div className="flex items-center gap-2 text-accent/90">
              <Heart className="w-4 h-4 fill-accent text-accent" />
              <p className="font-hind text-lg italic">
                Har Safar Mein Apnapan
              </p>
            </div>
            
            <p className="text-white/85 leading-relaxed text-sm border-l-2 border-accent/50 pl-4">
              Your trusted partner for local rides, outstation journeys & emergency ambulance services across the Chambal region.
            </p>
            
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <Car className="w-4 h-4" />
              <span>Rides</span>
              <span className="text-accent">•</span>
              <Ambulance className="w-4 h-4" />
              <span>Ambulance</span>
              <span className="text-accent">•</span>
              <span>24/7 Service</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="font-poppins font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/alternatives/cabbieo-alternatives", label: "Alternatives" },
                { to: "/faq/cabbieo", label: "FAQ" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-and-conditions", label: "Terms & Conditions" },
                { to: "/solutions/cabbieo", label: "Solutions" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-white/80 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="font-poppins font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Local E-Rickshaw Rides",
                "Bike Rides",
                "Car/Cab Bookings",
                "Outstation Trips",
                "Ambulance Services",
              ].map((service) => (
                <li key={service} className="text-white/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-poppins font-semibold text-lg flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-sm space-y-1">
                    <a href="tel:011-69652647" className="text-white/90 hover:text-accent transition-colors block font-medium">
                      📞 011-69652647
                    </a>
                    <span className="text-white/50 text-xs">Call Center</span>
                    <a href="tel:+919422799905" className="text-white/80 hover:text-accent transition-colors block">
                      📱 +91 94227 99905
                    </a>
                    <span className="text-white/50 text-xs">Booking</span>
                    <a href="https://wa.me/918109185295" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors block">
                      💬 +91 81091 85295
                    </a>
                    <span className="text-white/50 text-xs">WhatsApp</span>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <a href="mailto:support@cabbieo.com" className="text-white/90 hover:text-accent transition-colors text-sm font-medium">
                      support@cabbieo.com
                    </a>
                    <p className="text-white/50 text-xs mt-1">Email Support</p>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-white/90 text-sm font-medium block">Palpur Colony</span>
                    <span className="text-white/70 text-xs">Dack Bangla Road, Sabalgarh</span>
                    <span className="text-white/70 text-xs block">Morena, MP - 476229</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-sm hidden md:block">Follow us:</span>
              {[
                { href: "https://www.facebook.com/Cabbieo", icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/cabbieollp/", icon: Instagram, label: "Instagram" },
                { href: "https://www.youtube.com/@CABBIEO", icon: Youtube, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-accent hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-white/60 text-sm flex items-center gap-2">
              © {currentYear} <span className="text-accent font-semibold">CABBIEO</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;