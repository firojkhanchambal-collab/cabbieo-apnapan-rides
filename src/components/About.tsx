import { Target, Users, TrendingUp, Heart } from "lucide-react";
import rickshawIcon from "@/assets/rickshaw-icon.png";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-6">
              About CABBIEO
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              CABBIEO एक Smart Local & Outstation Ride-Booking Platform है जो लोगों को जोड़ता है —
              Local e-Rickshaw, Bike, Cab, Ambulance, और Outstation Rides के माध्यम से।
            </p>

            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mb-8">
              <p className="text-xl font-poppins font-semibold text-primary mb-2">
                Our Mission
              </p>
              <p className="text-foreground leading-relaxed">
                To make travel simpler, affordable, and people-driven — connecting every city 
                with care and comfort.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Target, label: "Mission-Driven", desc: "Purpose-led platform" },
                { icon: Users, label: "Community First", desc: "Local at heart" },
                { icon: TrendingUp, label: "Always Growing", desc: "Expanding reach" },
                { icon: Heart, label: "Care & Trust", desc: "Built on values" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 rounded-xl bg-white hover:shadow-md transition-all"
                  >
                    <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-poppins font-semibold text-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img 
                src={rickshawIcon} 
                alt="CABBIEO Vehicle" 
                className="w-full max-w-md mx-auto drop-shadow-2xl animate-float"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-glow" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Coverage Area */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground mb-6">
            Serving Across Chambal Region
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Gwalior", "Morena", "Bhind", "Sheopur", "Datia", "Shivpuri"].map((city) => (
              <div 
                key={city}
                className="px-6 py-3 bg-white rounded-full border-2 border-primary/20 hover:border-primary hover:shadow-glow transition-all hover:scale-105 cursor-default"
              >
                <span className="font-poppins font-semibold text-primary">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;