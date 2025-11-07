import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, X, IndianRupee, MapPin, Shield, Clock, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsUber = () => {
  const comparisonData = [
    {
      category: "Pricing",
      cabbieo: "₹10-15 per km average. No surge pricing, transparent fixed rates",
      uber: "₹12-25 per km. Dynamic surge pricing during peak hours (1.5x-3x)",
      winner: "cabbieo"
    },
    {
      category: "Availability",
      cabbieo: "Strong coverage in Chambal region (Gwalior, Morena, Bhind, etc.)",
      uber: "Limited to major cities, sparse in tier-2/3 cities",
      winner: "cabbieo"
    },
    {
      category: "Vehicle Options",
      cabbieo: "E-rickshaw, Bike, Car, Ambulance - suited for local needs",
      uber: "Primarily cars (UberGo, Premier, XL). No e-rickshaw or ambulance",
      winner: "cabbieo"
    },
    {
      category: "Local Focus",
      cabbieo: "Community drivers from your area. Hindi & regional languages",
      uber: "International platform. English-first approach",
      winner: "cabbieo"
    },
    {
      category: "Customer Support",
      cabbieo: "24/7 local support in Hindi & English. Quick resolution",
      uber: "App-based support. Often automated, longer resolution time",
      winner: "cabbieo"
    },
    {
      category: "Payment Options",
      cabbieo: "Cash, UPI, Cards, Wallets - flexible for all users",
      uber: "Primarily digital payments, limited cash acceptance",
      winner: "tie"
    },
    {
      category: "Outstation Trips",
      cabbieo: "Specialized outstation packages with transparent pricing",
      uber: "Limited outstation services, not a primary focus",
      winner: "cabbieo"
    },
    {
      category: "Driver Earnings",
      cabbieo: "Lower commission (15-20%), more earnings for drivers",
      uber: "Higher commission (25-30%), less take-home for drivers",
      winner: "cabbieo"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="font-poppins font-bold text-2xl text-accent hover:opacity-80">
            CABBIEO
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/alternatives/cabbieo-alternatives" className="text-accent hover:underline mb-4 inline-block">
            ← Back to All Alternatives
          </Link>
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            CABBIEO vs Uber: Complete Comparison 2025
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Which ride-booking platform is better for you?
          </p>
          <p className="text-lg opacity-80 max-w-3xl">
            An honest, detailed comparison between CABBIEO and Uber covering pricing, availability, 
            features, and local focus to help you make the right choice.
          </p>
        </div>
      </section>

      {/* Quick Stats Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">Quick Comparison Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CABBIEO Card */}
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="text-2xl">CABBIEO</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Pricing</p>
                    <p className="text-sm text-muted-foreground">₹10-15/km • No surge pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Best For</p>
                    <p className="text-sm text-muted-foreground">Chambal region, Local & Outstation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Community Focus</p>
                    <p className="text-sm text-muted-foreground">Local drivers, Regional languages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Vehicle Options</p>
                    <p className="text-sm text-muted-foreground">E-rickshaw, Bike, Car, Ambulance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uber Card */}
            <Card className="border-2">
              <CardHeader className="bg-muted">
                <CardTitle className="text-2xl">Uber</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Pricing</p>
                    <p className="text-sm text-muted-foreground">₹12-25/km • Surge pricing active</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Best For</p>
                    <p className="text-sm text-muted-foreground">Metro cities, Business travel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">International Platform</p>
                    <p className="text-sm text-muted-foreground">Global app, English-first</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Vehicle Options</p>
                    <p className="text-sm text-muted-foreground">UberGo, Premier, XL only</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">Detailed Feature Comparison</h2>
          
          <div className="max-w-6xl mx-auto space-y-6">
            {comparisonData.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Category */}
                    <div className="bg-muted p-6 flex items-center justify-center border-r">
                      <h3 className="font-poppins font-bold text-xl text-center">{item.category}</h3>
                    </div>
                    
                    {/* CABBIEO */}
                    <div className={`p-6 ${item.winner === 'cabbieo' ? 'bg-primary/5 border-2 border-primary' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold text-primary">CABBIEO</span>
                        {item.winner === 'cabbieo' && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.cabbieo}</p>
                    </div>
                    
                    {/* Uber */}
                    <div className={`p-6 border-l ${item.winner === 'uber' ? 'bg-primary/5 border-2 border-primary' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold">Uber</span>
                        {item.winner === 'uber' && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.uber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Deep Dive */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-8">Real Cost Comparison</h2>
          
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-xl mb-4">Example: 10 KM Ride in Gwalior</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <p className="font-semibold text-primary mb-2">CABBIEO (E-Rickshaw/Bike)</p>
                      <p className="text-3xl font-bold mb-2">₹100-150</p>
                      <p className="text-sm text-muted-foreground">Fixed rate, no hidden charges</p>
                    </div>
                    <div className="bg-muted p-6 rounded-lg">
                      <p className="font-semibold mb-2">Uber (UberGo)</p>
                      <p className="text-3xl font-bold mb-2">₹150-250</p>
                      <p className="text-sm text-muted-foreground">Plus surge during peak hours</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4">Outstation: Gwalior to Agra (120 KM)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <p className="font-semibold text-primary mb-2">CABBIEO</p>
                      <p className="text-3xl font-bold mb-2">₹1,500-2,000</p>
                      <p className="text-sm text-muted-foreground">Round trip package available</p>
                    </div>
                    <div className="bg-muted p-6 rounded-lg">
                      <p className="font-semibold mb-2">Uber</p>
                      <p className="text-3xl font-bold mb-2">₹2,500-3,500</p>
                      <p className="text-sm text-muted-foreground">Limited availability for outstation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Winner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                The Verdict: CABBIEO Wins for Local Travel
              </h2>
              <p className="text-xl mb-8 opacity-90">
                For riders in Chambal region, CABBIEO offers better value, more vehicle options, 
                and stronger local presence at 30-40% lower cost than Uber.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold">
                    Book with CABBIEO Now
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/alternatives/cabbieo-alternatives">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Compare Other Alternatives
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <h2 className="font-poppins font-bold text-3xl mb-6">
              CABBIEO vs Uber: Which is Better in 2025?
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              When comparing ride-booking platforms in India, the debate between CABBIEO and Uber often comes 
              down to your specific needs and location. While Uber is a well-established international brand 
              with presence in major metro cities, CABBIEO has carved a niche as the preferred choice for 
              travelers in the Chambal region including Gwalior, Morena, Bhind, Sheopur, Datia, and Shivpuri.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Why CABBIEO Beats Uber for Local Travel</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>1. No Surge Pricing:</strong> Unlike Uber's notorious surge pricing that can multiply 
              fares by 2-3x during peak hours or bad weather, CABBIEO maintains consistent, transparent pricing 
              throughout the day. This means you'll never face bill shock after completing your ride.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>2. Diverse Vehicle Options:</strong> While Uber primarily offers car-based rides 
              (UberGo, Premier, XL), CABBIEO provides a complete range of transportation options suited to 
              Indian conditions - from economical e-rickshaws for short distances, bikes for quick solo trips, 
              comfortable cars for families, to ambulance services for medical emergencies.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>3. Strong Local Presence:</strong> CABBIEO drivers are members of your community who 
              speak Hindi and regional languages fluently. They understand local routes, shortcuts, and 
              landmarks better than Uber drivers who may be new to the area. This local connection ensures 
              safer, more comfortable rides.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">When Uber Might Be a Better Choice</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Uber can be preferable if you're traveling in major metros like Mumbai, Delhi, or Bangalore where 
              they have stronger fleet availability. For international travelers unfamiliar with local languages, 
              Uber's English-first app interface might feel more comfortable. However, for residents and regular 
              travelers in tier-2 and tier-3 cities, CABBIEO's local expertise and affordability make it the 
              clear winner.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">The Bottom Line</h3>
            
            <p className="text-muted-foreground leading-relaxed">
              If you're in the Chambal region or planning outstation trips from these areas, CABBIEO offers 
              superior value with 30-40% lower costs, better vehicle variety, no surge pricing, and strong 
              local support. Download the CABBIEO app today and experience "Har Safar Mein Apnapan" - 
              the warmth of community in every journey.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsUber;
