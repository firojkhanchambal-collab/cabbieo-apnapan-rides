import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, IndianRupee, MapPin, Shield, Bike, Car, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsRapido = () => {
  const comparisonData = [
    {
      category: "Vehicle Options",
      cabbieo: "E-rickshaw, Bike, Car, Ambulance - Complete mobility solution",
      rapido: "Primarily bike taxis. Limited auto & car options in select cities",
      winner: "cabbieo"
    },
    {
      category: "Safety Features",
      cabbieo: "Verified drivers, insurance, 24/7 support, emergency button, ride tracking",
      rapido: "Basic safety features. Helmet provision. Limited emergency support",
      winner: "cabbieo"
    },
    {
      category: "Pricing",
      cabbieo: "₹10-15/km for bikes. No surge pricing. Transparent fixed rates",
      rapido: "₹3-6/km for bikes. Surge during peak hours. Very economical for solo rides",
      winner: "rapido"
    },
    {
      category: "Chambal Region Coverage",
      cabbieo: "Excellent coverage - Gwalior, Morena, Bhind, Sheopur, Datia, Shivpuri",
      rapido: "Limited presence in tier-2/3 cities. Strong in metros only",
      winner: "cabbieo"
    },
    {
      category: "Family Rides",
      cabbieo: "Car & e-rickshaw options for families. Safe for women & children",
      rapido: "Bike-only not suitable for families or groups",
      winner: "cabbieo"
    },
    {
      category: "Outstation Travel",
      cabbieo: "Specialized outstation packages with cars. Round trip options",
      rapido: "Not designed for outstation trips. Bike taxis only for city rides",
      winner: "cabbieo"
    },
    {
      category: "Weather Protection",
      cabbieo: "E-rickshaw & car options protected from rain & heat",
      rapido: "Bikes only - exposed to weather conditions",
      winner: "cabbieo"
    },
    {
      category: "Luggage Capacity",
      cabbieo: "Can carry groceries, luggage in cars & e-rickshaws",
      rapido: "Very limited luggage space on bikes",
      winner: "cabbieo"
    },
    {
      category: "Speed (Solo Short Trips)",
      cabbieo: "Fast bikes available. Good for quick short distance",
      rapido: "Extremely fast for solo riders. Best for beating traffic",
      winner: "rapido"
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
            CABBIEO vs Rapido: Complete Comparison 2025
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Bike Taxis vs Complete Mobility Solution
          </p>
          <p className="text-lg opacity-80 max-w-3xl">
            A detailed comparison between CABBIEO's comprehensive ride-booking platform and Rapido's 
            bike-taxi focused service to help you choose the right option for your travel needs.
          </p>
        </div>
      </section>

      {/* Key Differences Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">Platform Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CABBIEO */}
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="text-2xl">CABBIEO</CardTitle>
                <p className="text-sm opacity-90">All-in-One Mobility Platform</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Multiple Vehicles</p>
                    <p className="text-sm text-muted-foreground">E-rickshaw, Bike, Car, Ambulance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Enhanced Safety</p>
                    <p className="text-sm text-muted-foreground">Verified drivers, insurance, 24/7 support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Family-Friendly</p>
                    <p className="text-sm text-muted-foreground">Safe for all age groups & genders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Regional Focus</p>
                    <p className="text-sm text-muted-foreground">Strong in Chambal tier-2/3 cities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rapido */}
            <Card className="border-2">
              <CardHeader className="bg-muted">
                <CardTitle className="text-2xl">Rapido</CardTitle>
                <p className="text-sm">Bike Taxi Specialist</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Bike className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Bike-Focused</p>
                    <p className="text-sm text-muted-foreground">Primarily two-wheeler rides</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Super Economical</p>
                    <p className="text-sm text-muted-foreground">Cheapest for solo short trips</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Quick Rides</p>
                    <p className="text-sm text-muted-foreground">Fast through traffic on bikes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Metro Cities</p>
                    <p className="text-sm text-muted-foreground">Strong in Bangalore, Hyderabad</p>
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
                    
                    <div className={`p-6 border-l ${item.winner === 'rapido' ? 'bg-primary/5 border-2 border-primary' : ''}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold">Rapido</span>
                        {item.winner === 'rapido' && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.rapido}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Scenarios */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-12 text-center">Which Platform For Which Need?</h2>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* When to Choose CABBIEO */}
            <Card className="border-2 border-primary">
              <CardHeader className="bg-primary text-white">
                <CardTitle>Choose CABBIEO When:</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Traveling with family</strong> - Need car or e-rickshaw for multiple passengers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Carrying luggage</strong> - Shopping bags, groceries, or travel bags</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Bad weather</strong> - Rain or extreme heat protection needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Women & senior citizens</strong> - Safer enclosed vehicle options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Outstation trips</strong> - Long distance comfortable travel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>In Chambal region</strong> - Better availability in Gwalior, Morena, etc.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Medical emergency</strong> - Ambulance service available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* When to Choose Rapido */}
            <Card className="border-2">
              <CardHeader className="bg-muted">
                <CardTitle>Choose Rapido When:</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>Solo short trips</strong> - Quick commute under 5 km in metros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>Extreme budget</strong> - Need absolute cheapest option</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>Heavy traffic</strong> - Bikes can navigate faster through jams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>In major metros</strong> - Good availability in Bangalore, Hyderabad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>No luggage</strong> - Traveling light with just a backpack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>Good weather</strong> - Clear sunny day, comfortable riding pillion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span><strong>Young male riders</strong> - Comfortable with bike rides</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-8 text-center">Cost Comparison Examples</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">3 KM Solo Trip in City</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO (Bike)</p>
                    <p className="text-4xl font-bold mb-2">₹40-50</p>
                    <p className="text-sm text-muted-foreground">Good option but slightly higher</p>
                  </div>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold mb-2">Rapido (Bike)</p>
                    <p className="text-4xl font-bold mb-2">₹25-35</p>
                    <p className="text-sm text-muted-foreground">⭐ Most economical</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Family of 4 Going 8 KM</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO (Car)</p>
                    <p className="text-4xl font-bold mb-2">₹120-150</p>
                    <p className="text-sm text-muted-foreground">⭐ Only viable option - comfortable & safe</p>
                  </div>
                  <div className="bg-muted p-6 rounded-lg opacity-50">
                    <p className="font-semibold mb-2">Rapido</p>
                    <p className="text-4xl font-bold mb-2">Not Possible</p>
                    <p className="text-sm text-muted-foreground">Bikes can't accommodate 4 people</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Outstation: Gwalior to Agra (120 KM)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="font-semibold text-primary mb-2">CABBIEO</p>
                    <p className="text-4xl font-bold mb-2">₹1,800-2,200</p>
                    <p className="text-sm text-muted-foreground">⭐ Comfortable car with outstation package</p>
                  </div>
                  <div className="bg-muted p-6 rounded-lg opacity-50">
                    <p className="font-semibold mb-2">Rapido</p>
                    <p className="text-4xl font-bold mb-2">Not Available</p>
                    <p className="text-sm text-muted-foreground">Bike taxis only for city rides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                The Verdict: CABBIEO for Complete Mobility
              </h2>
              <p className="text-xl mb-8 opacity-90">
                While Rapido wins for ultra-budget solo short trips in metros, CABBIEO is the clear winner 
                for comprehensive mobility needs with diverse vehicle options, better safety, family-friendly 
                rides, and strong Chambal region presence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold">
                    Download CABBIEO App
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/alternatives/cabbieo-alternatives">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Compare More Alternatives
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEO Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <h2 className="font-poppins font-bold text-3xl mb-6">
              CABBIEO vs Rapido: Comprehensive vs Specialized Ride Platforms
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              The comparison between CABBIEO and Rapido represents two different philosophies in ride-booking: 
              comprehensive mobility solutions versus specialized bike taxi services. Understanding which platform 
              suits your needs depends on your typical travel patterns, family situation, and location.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Rapido's Strength: Ultra-Economical Bike Rides</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rapido has popularized bike taxis in India, making them the go-to option for young professionals 
              and students looking for the absolute cheapest rides for short solo trips. At ₹3-6 per kilometer, 
              Rapido bikes are unbeatable in terms of pure economics. They're also incredibly fast, able to weave 
              through traffic jams that would trap cars and autos for hours.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">CABBIEO's Advantage: Complete Mobility Ecosystem</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              CABBIEO takes a different approach - instead of specializing in one vehicle type, we offer a complete 
              range of transportation options. Need to take your family to a wedding? Book our car. Quick solo trip 
              to the market? Take a bike. Want protection from rain with economical pricing? Choose an e-rickshaw. 
              Medical emergency? We have ambulances ready. This versatility makes CABBIEO a true one-stop mobility 
              solution for the entire family.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Safety Considerations</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Safety is a critical factor where CABBIEO has significant advantages. While Rapido provides basic 
              safety features like helmets, riding pillion on a bike inherently carries more risks - exposure to 
              weather, traffic accidents, and limited protection. CABBIEO's enclosed vehicle options (e-rickshaw, 
              car) provide better safety, especially for women, children, and senior citizens. Our 24/7 customer 
              support and comprehensive insurance coverage add extra layers of security.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Geographic Availability</h3>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rapido has strong presence in major metros like Bangalore and Hyderabad, but their coverage in 
              tier-2 and tier-3 cities is limited. CABBIEO, on the other hand, was built specifically for the 
              Chambal region with deep penetration in Gwalior, Morena, Bhind, Sheopur, Datia, and Shivpuri. If 
              you're in these areas, CABBIEO offers far better availability and reliability.
            </p>

            <h3 className="font-poppins font-bold text-2xl mb-4">Final Recommendation</h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Choose Rapido if you're a solo rider in metros looking for the absolute cheapest short trips and 
              comfortable riding pillion. Choose CABBIEO if you value safety, need family-friendly options, carry 
              luggage regularly, travel in the Chambal region, or want a comprehensive mobility solution that adapts 
              to all your transportation needs. For most users, especially families, CABBIEO provides far better 
              overall value and peace of mind.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsRapido;
