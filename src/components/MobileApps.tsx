import { Download, Star, Users, Zap, Shield, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import appsDecoBg from "@/assets/apps-decoration-bg.jpg";
import customerIcon from "@/assets/cabbieo-customer-icon.png";
import driverIcon from "@/assets/cabbieo-driver-icon.png";

const MobileApps = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Decorative Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${appsDecoBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-up">
          <Badge className="mb-4 px-6 py-2 text-lg hover-scale">
            <Download className="w-4 h-4 mr-2 inline" />
            Download Karo Aur Shuru Karo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cabbieo Ki Duniya Mein Aaiye! 🚖
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 font-semibold mb-3">
            Smart Travel Ka Smart Solution
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chahiye ride ya karna hai kamai? Humne banaya hai dono ke liye perfect app!
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Customer App Card */}
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl group animate-fade-up">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            
            <CardContent className="p-8 relative">
              {/* Customer App Icon */}
              <div className="mb-6 text-center">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.taxigo.proapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <div className="w-28 h-28 mx-auto hover-scale transform transition-all duration-300 hover:rotate-3">
                    <img 
                      src={customerIcon} 
                      alt="Cabbieo Customer App Icon" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </a>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Riders Ke Liye 🎯</h3>
                <p className="text-xl font-semibold text-primary mb-2">
                  Cabbieo - Book Auto, Cab & Bike
                </p>
                <p className="text-muted-foreground">
                  Kaheen bhi jaana ho, bas ek tap mein book karo
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span>Instant booking with real-time tracking</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <span>Safe rides with verified drivers</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-4 h-4 text-primary" />
                  </div>
                  <span>Affordable rates, transparent pricing</span>
                </div>
              </div>

              <Button 
                className="w-full h-12 text-base font-semibold hover-scale"
                size="lg"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.taxigo.proapp', '_blank')}
              >
                <Download className="w-5 h-5 mr-2" />
                Google Play Se Download Karo
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5+</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">50K+ Users</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver App Card */}
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl group animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            
            <CardContent className="p-8 relative">
              {/* Driver App Icon */}
              <div className="mb-6 text-center">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.taxigo.propilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <div className="w-28 h-28 mx-auto hover-scale transform transition-all duration-300 hover:rotate-3">
                    <img 
                      src={driverIcon} 
                      alt="Cabbieo Driver App Icon" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </a>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Drivers Ke Liye 💪</h3>
                <p className="text-xl font-semibold text-accent mb-2">
                  Cabbieo Drive: Earn & Grow
                </p>
                <p className="text-muted-foreground">
                  Apni gaadi se shuru karo kamai ka naya safar
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-4 h-4 text-accent" />
                  </div>
                  <span>Daily instant payments & cashouts</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <span>Maximum rides, maximum earnings</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <span>Insurance coverage & 24/7 support</span>
                </div>
              </div>

              <Button 
                className="w-full h-12 text-base font-semibold hover-scale"
                size="lg"
                variant="secondary"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.taxigo.propilot', '_blank')}
              >
                <Download className="w-5 h-5 mr-2" />
                Google Play Se Download Karo
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.6+</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">25K+ Drivers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-block bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-xl md:text-2xl font-bold mb-2">
              🌐 Aasaan Booking • Bharosemand Rides • Zabardast Kamai
            </p>
            <p className="text-lg text-muted-foreground">
              Join karo India ka <span className="font-bold text-primary">fastest growing</span> transport network!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApps;
