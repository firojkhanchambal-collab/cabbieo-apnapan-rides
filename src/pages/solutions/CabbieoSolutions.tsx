import { ArrowLeft, Car, Bike, Ambulance, Users, MapPin, Clock, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const CabbieoSolutions = () => {
  const solutions = [
    {
      icon: Car,
      title: "Local & Outstation Rides",
      description: "Har shehar mein aur shehar ke bahar, aapki har safar ke liye reliable rides",
      features: [
        "24/7 availability in Chambal region",
        "Transparent pricing with no hidden charges",
        "Professional and verified drivers",
        "Clean and well-maintained vehicles"
      ],
      color: "text-primary"
    },
    {
      icon: Bike,
      title: "E-Rickshaw & Bike Rides",
      description: "Eco-friendly aur affordable short distance travel",
      features: [
        "Perfect for local commutes",
        "Budget-friendly rates",
        "Quick pickups",
        "Environment-friendly options"
      ],
      color: "text-accent"
    },
    {
      icon: Ambulance,
      title: "Emergency Ambulance Service",
      description: "Medical emergencies mein fast aur reliable ambulance service",
      features: [
        "Rapid response time",
        "Trained medical staff",
        "Well-equipped ambulances",
        "Direct hospital coordination"
      ],
      color: "text-red-500"
    },
    {
      icon: Users,
      title: "Driver Partnership Program",
      description: "Apne vehicle se kamao, flexible timings ke saath",
      features: [
        "Zero commission for first month",
        "Weekly payouts",
        "Insurance coverage",
        "Training and support"
      ],
      color: "text-green-500"
    }
  ];

  const benefits = [
    {
      icon: MapPin,
      title: "Local Coverage",
      description: "Gwalior aur Chambal region ke har corner mein service"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Din ho ya raat, hum hamesha aapke saath hain"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Verified drivers aur secure rides ki guarantee"
    },
    {
      icon: Sparkles,
      title: "Best Prices",
      description: "Market mein sabse competitive rates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="max-w-3xl animate-fade-in">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
              Cabbieo Solutions
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Har Safar Mein Apnapan - Complete Transportation Solutions for Chambal Region
            </p>
            <p className="text-white/80 leading-relaxed">
              Local rides se lekar outstation trips tak, emergency ambulance se lekar daily commute - 
              Cabbieo har zaroorat ka solution provide karta hai.
            </p>
          </div>
        </div>
      </section>

      {/* Main Solutions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Our Complete Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aapki har transportation need ke liye ek hi platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 ${solution.color}`}>
                    <solution.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{solution.title}</CardTitle>
                  <CardDescription className="text-base">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Kyun Choose Karein Cabbieo?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Local business jo samajhta hai aapki local zaroorat
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="py-12 px-6 text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
                Ready to Experience Cabbieo?
              </h2>
              <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                Download our app aur paye hassle-free rides apne city mein
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                  <a href="https://play.google.com/store/apps/details?id=com.cabbieo.customer" target="_blank" rel="noopener noreferrer">
                    Download Customer App
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white" asChild>
                  <a href="https://play.google.com/store/apps/details?id=com.cabbieo.driver" target="_blank" rel="noopener noreferrer">
                    Become a Driver Partner
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoSolutions;
