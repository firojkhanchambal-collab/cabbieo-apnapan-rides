import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, IndianRupee, MapPin, Shield, Users, Smartphone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsOla = () => {
  const comparisonData = [
    {
      category: "Pricing Strategy",
      cabbieo: "Fixed transparent rates. ₹10-15/km average with no hidden charges",
      ola: "Variable pricing with peak hours surge. ₹13-22/km plus additional fees",
      winner: "cabbieo"
    },
    {
      category: "Regional Coverage",
      cabbieo: "Dominant in Chambal region - Gwalior, Morena, Bhind, Sheopur, Datia, Shivpuri",
      ola: "Strong in metros, limited penetration in tier-2/3 cities",
      winner: "cabbieo"
    },
    {
      category: "Vehicle Variety",
      cabbieo: "E-rickshaw, Bike, Car, Ambulance - complete mobility solutions",
      ola: "Ola Micro, Mini, Prime, Auto. No ambulance or e-rickshaw",
      winner: "cabbieo"
    },
    {
      category: "Local Language Support",
      cabbieo: "Full Hindi & regional language support. Local customer care",
      ola: "Hindi support available but primarily English-focused",
      winner: "cabbieo"
    },
    {
      category: "Driver Commission",
      cabbieo: "15-20% commission - more earnings for driver partners",
      ola: "22-28% commission - higher platform fees",
      winner: "cabbieo"
    },
    {
      category: "App Features",
      cabbieo: "Simple, intuitive interface. Quick booking in seconds",
      ola: "Feature-rich app with multiple categories and options",
      winner: "tie"
    },
    {
      category: "Outstation Packages",
      cabbieo: "Specialized outstation rates with flexible packages",
      ola: "Outstation available but premium pricing",
      winner: "cabbieo"
    },
    {
      category: "Payment Flexibility",
      cabbieo: "Cash, UPI, Cards, Wallets - all options accepted",
      ola: "Digital payments preferred, limited cash acceptance",
      winner: "cabbieo"
    },
    {
      category: "Customer Support",
      cabbieo: "24/7 local support team. Quick response in Hindi/English",
      ola: "In-app support with longer resolution times",
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
            CABBIEO vs Ola: Honest Comparison 2025
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Two Indian ride-booking giants compared head-to-head
          </p>
          <p className="text-lg opacity-80 max-w-3xl">
            A comprehensive comparison between CABBIEO and Ola Cabs covering pricing, features, coverage, 
            and which platform offers better value for money in the Chambal region.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">At a Glance Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CABBIEO */}
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="text-2xl">CABBIEO</CardTitle>
                <p className="text-sm opacity-90">Best for Chambal Region</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Lower Costs</p>
                    <p className="text-sm text-muted-foreground">30-35% cheaper than Ola</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Strong Local Presence</p>
                    <p className="text-sm text-muted-foreground">Deep coverage in tier-2/3 cities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Community Drivers</p>
                    <p className="text-sm text-muted-foreground">Local, verified driver partners</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Simple Booking</p>
                    <p className="text-sm text-muted-foreground">Quick 30-second booking process</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ola */}
            <Card className="border-2">
              <CardHeader className="bg-muted">
                <CardTitle className="text-2xl">Ola Cabs</CardTitle>
                <p className="text-sm">Best for Metro Cities</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Premium Pricing</p>
                    <p className="text-sm text-muted-foreground">Higher base fare + surge pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Metro Focus</p>
                    <p className="text-sm text-muted-foreground">Limited in smaller cities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Large Fleet</p>
                    <p className="text-sm text-muted-foreground">Pan-India driver network</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Feature-Rich App</p>
                    <p className="text-sm text-muted-foreground">Multiple ride categories & options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">Feature-by-Feature Comparison</h2>
          
          <div className="max-w-6xl mx-auto space-y-6">
            {comparisonData.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="bg-muted p-6 flex items-center justify-center border-r">
                      <h3 className="font-poppins font-bold text-xl text-center">{item.category}</h3>
                    </div>
                    
                    <div className={`p-6 ${item.winner === 'cabbieo' ? 'bg-primary/5 border-2 border-primary' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold text-primary">CABBIEO</span>
                        {item.winner === 'cabbieo' && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.cabbieo}</p>
                    </div>
                    
                    <div className={`p-6 border-l ${item.winner === 'ola' ? 'bg-primary/5 border-2 border-primary' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold">Ola Cabs</span>
                        {item.winner === 'ola' && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.ola}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Pricing Examples */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-8 text-center">Real-World Pricing Comparison</h2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Local City Ride */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Scenario 1: Local City Ride (8 KM in Gwalior)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO (Bike/E-Rickshaw)</p>
                    <p className="text-4xl font-bold mb-2">₹80-120</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Base fare: ₹20</li>
                      <li>• Per km: ₹10-12</li>
                      <li>• No surge pricing</li>
                      <li>• Total: Fixed transparent rate</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="font-semibold mb-2">Ola (Ola Micro/Mini)</p>
                    <p className="text-4xl font-bold mb-2">₹120-180</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Base fare: ₹35-45</li>
                      <li>• Per km: ₹12-15</li>
                      <li>• Surge: +20-50% peak hours</li>
                      <li>• Service fee: ₹10</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-center font-semibold text-primary">Savings with CABBIEO: ₹40-60 per ride (33-50%)</p>
              </CardContent>
            </Card>

            {/* Outstation Trip */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Scenario 2: Outstation Trip (Gwalior to Jaipur - 380 KM)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO (Outstation Package)</p>
                    <p className="text-4xl font-bold mb-2">₹4,500-5,500</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Round trip package available</li>
                      <li>• Driver allowance included</li>
                      <li>• No hidden charges</li>
                      <li>• Flexible timing</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="font-semibold mb-2">Ola (Outstation)</p>
                    <p className="text-4xl font-bold mb-2">₹6,500-8,000</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Per km charges apply</li>
                      <li>• Driver allowance extra</li>
                      <li>• Toll & parking extra</li>
                      <li>• Limited availability</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-center font-semibold text-primary">Savings with CABBIEO: ₹2,000-2,500 per trip (31-44%)</p>
              </CardContent>
            </Card>

            {/* Daily Commute */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Scenario 3: Monthly Commute Cost (5 KM x 2 trips x 22 days)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO</p>
                    <p className="text-4xl font-bold mb-2">₹2,200-2,640</p>
                    <p className="text-sm text-muted-foreground">₹50-60 per trip × 44 trips</p>
                  </div>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="font-semibold mb-2">Ola</p>
                    <p className="text-4xl font-bold mb-2">₹3,300-4,400</p>
                    <p className="text-sm text-muted-foreground">₹75-100 per trip × 44 trips</p>
                  </div>
                </div>
                <p className="mt-4 text-center font-semibold text-primary">Monthly Savings: ₹1,100-1,760 (33-40%)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Winner Declaration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                Clear Winner: CABBIEO for Better Value & Local Support
              </h2>
              <p className="text-xl mb-8 opacity-90">
                CABBIEO wins with 30-40% lower pricing, better local coverage, diverse vehicle options, 
                and no surge pricing - making it the smarter choice for Chambal region travelers.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold">
                    Start Riding with CABBIEO
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/alternatives/cabbieo-alternatives">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    See All Comparisons
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO Article */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <h2 className="font-poppins font-bold text-3xl mb-6">
              CABBIEO vs Ola Cabs: Which Ride App Should You Choose in 2025?
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Both CABBIEO and Ola are Indian ride-booking platforms, but they serve different market segments 
              and user needs. While Ola has established itself as a national brand with presence across metros, 
              CABBIEO has emerged as the preferred choice for smart travelers in the Chambal region who prioritize 
              affordability, local connection, and transparent pricing.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Why CABBIEO Outperforms Ola</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Pricing Transparency:</strong> The biggest advantage CABBIEO has over Ola is pricing. 
              While Ola implements surge pricing during peak hours (which can increase fares by 20-50%), CABBIEO 
              maintains fixed, transparent rates throughout the day. Our analysis shows that CABBIEO riders save 
              30-40% on average compared to Ola riders for similar routes.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Local Market Understanding:</strong> CABBIEO was built specifically for the Chambal region 
              covering Gwalior, Morena, Bhind, Sheopur, Datia, and Shivpuri. This local focus means better 
              availability in tier-2 and tier-3 cities where Ola's presence is sparse. CABBIEO drivers know the 
              local roads, shortcuts, and landmarks intimately, ensuring faster and more efficient rides.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Diverse Vehicle Options:</strong> While Ola offers Micro, Mini, Prime, and Auto categories, 
              CABBIEO goes beyond with e-rickshaws (perfect for short, economical trips), bikes (for quick solo 
              commutes), cars (for family comfort), and even ambulance services (for medical emergencies). This 
              comprehensive vehicle range makes CABBIEO a one-stop mobility solution.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">When Might Ola Be Preferable?</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ola could be a better option if you're traveling in major metropolitan cities like Bangalore, 
              Hyderabad, or Chennai where they have extensive fleet coverage. Ola's app also offers more advanced 
              features like ride scheduling, multiple stops, and integrated food delivery services through Ola Foods.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">The Final Recommendation</h3>
            
            <p className="text-muted-foreground leading-relaxed">
              For residents and travelers in the Chambal region, CABBIEO is objectively the better choice. You'll 
              save significant money (₹1,000+ monthly for regular commuters), get faster service with local drivers, 
              enjoy more vehicle options, and never worry about surge pricing. Download CABBIEO today and join 
              thousands of satisfied riders experiencing "Har Safar Mein Apnapan."
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsOla;
