import { ArrowLeft, Car, Bike, Ambulance, Users, MapPin, Clock, Shield, Sparkles, IndianRupee, Zap, TrendingDown, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import rickshawIcon from "@/assets/rickshaw-icon.png";

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

      {/* Pricing Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 px-4 py-2 text-sm">Best Rates in Town</Badge>
            <h2 className="font-poppins font-bold text-3xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hero Products - Unbeatable Prices!
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Sabse sasti ride, sabse zyada saving. Cabbieo ke saath har safar bane economical!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Bike Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:w-40 group-hover:h-40"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <Bike className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Bike Rides</CardTitle>
                <CardDescription>Fast & Affordable</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-muted-foreground">Starting at just</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <IndianRupee className="w-8 h-8 text-primary" />
                    <span className="text-5xl font-bold text-primary">20</span>
                  </div>
                  <Badge variant="secondary" className="mt-3">Per Ride</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Quick pickup under 5 mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Safe & verified riders</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E-Rickshaw Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-accent/50 md:scale-105">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
              <Badge className="absolute top-4 right-4 bg-accent text-white">Most Popular</Badge>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:w-40 group-hover:h-40"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <img src={rickshawIcon} alt="E-Rickshaw" className="w-14 h-14 object-contain" />
                </div>
                <CardTitle className="text-2xl mb-2">E-Rickshaw</CardTitle>
                <CardDescription>Eco-Friendly Choice</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-muted-foreground">Starting at just</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <IndianRupee className="w-8 h-8 text-accent" />
                    <span className="text-5xl font-bold text-accent">35</span>
                  </div>
                  <Badge variant="secondary" className="mt-3">Per Ride</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Environment friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-accent" />
                    <span>Lowest price guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto Card */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:w-40 group-hover:h-40"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                  <Car className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">Auto Rides</CardTitle>
                <CardDescription>Comfortable Travel</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-sm text-muted-foreground">Starting at just</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <IndianRupee className="w-8 h-8 text-primary" />
                    <span className="text-5xl font-bold text-primary">40</span>
                  </div>
                  <Badge variant="secondary" className="mt-3">Per Ride</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>Perfect for groups</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Driver Benefits Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
              <CardContent className="py-12 px-6 relative z-10">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-accent text-white border-0">For Our Driver Partners</Badge>
                  <h3 className="font-poppins font-bold text-3xl mb-3">
                    India's Most Driver-Friendly Platform
                  </h3>
                  <p className="text-white/90 text-lg">
                    Zyada kamao, kam commission do. Bas itna sa formula!
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-xl">Low Commission</h4>
                    </div>
                    <p className="text-white/90 text-lg mb-2">Only <span className="text-accent font-bold text-2xl">5% - 15%</span></p>
                    <p className="text-white/70 text-sm">Market mein sabse kam commission rate</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-xl">Instant Withdrawal</h4>
                    </div>
                    <p className="text-white/90 text-lg mb-2"><span className="text-accent font-bold text-2xl">24/7</span> Available</p>
                    <p className="text-white/70 text-sm">Apne paise, apni marzi se nikalo</p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-transform" asChild>
                    <Link to="/driver/register">
                      Become a Driver Partner
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Solutions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Complete Transportation Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Har zaroorat ke liye ek bharosemand saathi
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
