import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/40" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full animate-float blur-xl" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-accent/30 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-primary/20 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight animate-slide-up">
          Har Safar Mein
          <span className="block text-accent mt-2 animate-glow">Apnapan</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Book local rides, intercity trips, or outstation cabs instantly
          <span className="block mt-2 text-accent font-semibold">Across Gwalior, Morena, Bhind & Beyond</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            onClick={scrollToBooking}
            className="bg-accent text-primary hover:bg-accent/90 font-poppins font-semibold text-lg px-8 py-6 shadow-glow transition-all hover:scale-105"
          >
            Book Your Ride
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-poppins font-semibold text-lg px-8 py-6 transition-all hover:scale-105"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {[
            { label: "Cities Covered", value: "6+" },
            { label: "Happy Riders", value: "10K+" },
            { label: "Driver Partners", value: "500+" },
            { label: "Daily Rides", value: "1000+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="text-3xl md:text-4xl font-poppins font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-glow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;