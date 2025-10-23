import { Shield, IndianRupee, Users, Clock, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChoose = () => {
  const features = [
    {
      icon: IndianRupee,
      title: "Affordable Fares",
      description: "Transparent pricing with no hidden charges. Pay what you see.",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Verified Drivers",
      description: "All our driver partners are verified and background-checked.",
      color: "text-primary",
    },
    {
      icon: Clock,
      title: "24×7 Support",
      description: "Round-the-clock customer service for your peace of mind.",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Local Community",
      description: "Supporting local drivers and strengthening our community.",
      color: "text-primary",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Consistently rated high by our happy customers.",
      color: "text-accent",
    },
    {
      icon: Heart,
      title: "Trusted Platform",
      description: "Built with care for the people of Chambal region.",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4">
            Why Choose CABBIEO?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not just a ride-booking platform. We're your travel companion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted group-hover:bg-gradient-primary transition-all">
                    <Icon className={`w-10 h-10 ${feature.color} group-hover:text-white transition-colors`} />
                  </div>
                  
                  <h3 className="font-poppins font-semibold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;