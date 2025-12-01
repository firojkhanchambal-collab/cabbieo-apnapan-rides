import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight, Bike, Car, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsBikeTaxis = () => {
  const comparisonData = [
    {
      category: "Vehicle Options",
      cabbieo: "Bikes, E-rickshaws, Autos, and Cars - complete range for all needs",
      competitor: "Only two-wheeler bikes, no option for larger groups or luggage",
      winner: "CABBIEO"
    },
    {
      category: "Safety Standards",
      cabbieo: "All vehicle types with proper safety features, verified drivers, insurance coverage",
      competitor: "Two-wheeler risks, helmet quality concerns, weather exposure",
      winner: "CABBIEO"
    },
    {
      category: "Pricing",
      cabbieo: "Bike ₹19, E-rickshaw ₹29, Auto ₹39, Car ₹99 - transparent fixed rates",
      competitor: "Low base fares but limited to bike rides only, surge pricing during peak",
      winner: "CABBIEO"
    },
    {
      category: "Comfort Level",
      cabbieo: "Choose comfort level: Open bike, covered e-rickshaw, enclosed auto, or AC car",
      competitor: "Bike rides only - no protection from weather, pollution, or sun",
      winner: "CABBIEO"
    },
    {
      category: "Luggage Capacity",
      cabbieo: "E-rickshaws, Autos, and Cars can handle shopping bags, suitcases, parcels",
      competitor: "Very limited luggage space on bikes, no cargo capacity",
      winner: "CABBIEO"
    },
    {
      category: "Family Travel",
      cabbieo: "E-rickshaws and Autos for 3-4 people, Cars for families with kids",
      competitor: "Single pillion rider only, families need multiple bookings",
      winner: "CABBIEO"
    },
    {
      category: "Weather Protection",
      cabbieo: "Covered options available: E-rickshaws, Autos, AC Cars for all weather",
      competitor: "Exposed to rain, heat, dust, and pollution on bike rides",
      winner: "CABBIEO"
    },
    {
      category: "Regional Focus",
      cabbieo: "Specialized for Chambal region with local drivers and expertise",
      competitor: "Present in major cities but limited in tier-2/3 city coverage",
      winner: "CABBIEO"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/cabbieo-logo.png" alt="CABBIEO Logo" className="h-10" />
          </Link>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CABBIEO vs Bike Taxi Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Why multiple vehicle options beat single-option bike services
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="gap-2">
                  Explore All Options with CABBIEO <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img src="/src/assets/cabbieo-logo.png" alt="CABBIEO" className="h-8" />
                  CABBIEO
                </CardTitle>
                <CardDescription>Multi-Vehicle Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>4 vehicle types: Bike, E-rickshaw, Auto, Car</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Weather-protected options available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Family and group travel supported</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Luggage and cargo capacity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Starting from ₹19</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bike className="w-6 h-6" />
                  Bike Taxi Services
                </CardTitle>
                <CardDescription>Two-Wheeler Only Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Only bike rides available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>No weather protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Single pillion rider only</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Minimal luggage capacity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Quick in heavy traffic</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Feature-by-Feature Analysis</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th className="border p-4 text-left">Feature</th>
                    <th className="border p-4 text-left">CABBIEO</th>
                    <th className="border p-4 text-left">Bike Taxi Services</th>
                    <th className="border p-4 text-center">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="hover:bg-card/50">
                      <td className="border p-4 font-semibold">{item.category}</td>
                      <td className="border p-4">{item.cabbieo}</td>
                      <td className="border p-4">{item.competitor}</td>
                      <td className="border p-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.winner === "CABBIEO" ? "bg-green-100 text-green-800" :
                          item.winner === "Tie" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {item.winner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Scenarios */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Which Service for Which Situation?</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bike className="w-6 h-6" />
                    Solo Quick Commute
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">CABBIEO Bike - ₹19:</h4>
                    <p className="text-sm text-muted-foreground">
                      Same speed and convenience as bike taxis, verified driver, lower starting price, 
                      option to upgrade to covered vehicle if weather changes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Bike Taxi Service:</h4>
                    <p className="text-sm text-muted-foreground">
                      Quick ride but stuck with bike option even if it starts raining. No upgrade possible 
                      mid-booking.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Shopping Trip with Bags
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">CABBIEO Auto/Car:</h4>
                    <p className="text-sm text-muted-foreground">
                      E-rickshaw (₹29) or Auto (₹39) perfect for shopping bags, groceries, parcels. 
                      Covered protection for your purchases. Car (₹99) for larger shopping.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Bike Taxi Service:</h4>
                    <p className="text-sm text-muted-foreground">
                      Impossible to carry shopping bags safely on a bike. Need to book separate delivery 
                      service or make multiple trips.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-6 h-6" />
                    Family Outing
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">CABBIEO E-rickshaw/Auto/Car:</h4>
                    <p className="text-sm text-muted-foreground">
                      E-rickshaw for 3-4 people at ₹29, Auto for ₹39, or comfortable AC Car for ₹99. 
                      One booking, everyone together, safe family travel.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Bike Taxi Service:</h4>
                    <p className="text-sm text-muted-foreground">
                      Need to book multiple bikes, family travels separately, higher total cost, 
                      safety concerns for kids, coordination hassle.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="w-6 h-6" />
                    Rainy Day / Hot Summer
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">CABBIEO Covered Options:</h4>
                    <p className="text-sm text-muted-foreground">
                      E-rickshaw, Auto, or AC Car provide complete weather protection. Stay dry in rain, 
                      cool in summer. Comfort and safety guaranteed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Bike Taxi Service:</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct exposure to rain and sun. Get wet during monsoon, face pollution and heat. 
                      Raincoat provided but still uncomfortable.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>5 km City Ride</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">CABBIEO Options:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Bike: ₹19-95</li>
                        <li>• E-rickshaw: ₹29-145</li>
                        <li>• Auto: ₹39-195</li>
                        <li>• Car: ₹99-499</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2 text-muted-foreground">Bike Taxi:</p>
                      <p className="text-sm">Only Bike: ₹30-120 (one option only)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Family of 3 - 8 km</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">CABBIEO:</p>
                      <p className="text-sm">E-rickshaw: ₹29-232 (all 3 together)</p>
                      <p className="text-sm">Auto: ₹39-312 (more comfort)</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2 text-muted-foreground">Bike Taxi:</p>
                      <p className="text-sm">3 separate bikes needed</p>
                      <p className="text-sm text-red-600">Total: ₹48-192 × 3 = ₹144-576</p>
                      <p className="text-xs text-muted-foreground mt-1">More expensive + safety risk</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final Verdict */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">The Verdict: CABBIEO Wins</CardTitle>
                <CardDescription className="text-lg">Flexibility and Safety Over Single-Option Limitation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      Choose CABBIEO when you need:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Options based on weather, luggage, or companions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Weather protection and comfort</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Family or group travel in one vehicle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Luggage capacity for shopping or travel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Better safety standards across all vehicles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Bike Taxis Might Work If:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• You're always traveling solo</li>
                      <li>• You never carry any luggage</li>
                      <li>• Weather is always perfect</li>
                      <li>• You're comfortable with two-wheeler risks</li>
                      <li>• You don't mind pollution exposure</li>
                    </ul>
                    <p className="text-sm mt-4 text-muted-foreground italic">
                      But why limit yourself when CABBIEO offers bikes PLUS three other options?
                    </p>
                  </div>
                </div>
                <div className="text-center pt-6">
                  <Link to="/">
                    <Button size="lg" className="gap-2">
                      Get Started with CABBIEO <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Article */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Why CABBIEO's Multi-Vehicle Approach Beats Single-Option Bike Services</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bike taxi services revolutionized quick urban transport, but they come with a fundamental limitation: 
              they only offer one type of vehicle. CABBIEO recognized that different situations require different 
              transportation solutions, which is why the platform provides four distinct vehicle categories.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Safety Advantage</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Two-wheeler accidents are statistically more dangerous than four-wheeler travel. With CABBIEO's 
              e-rickshaws, autos, and cars, you get the stability and protection of enclosed or partially 
              enclosed vehicles. This is especially important for families with children, elderly passengers, 
              or anyone concerned about road safety.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Weather and Comfort Considerations</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Chambal region experiences extreme weather—scorching summers, monsoon rains, and dusty conditions. 
              While bike taxis offer raincoats, they can't match the comfort of CABBIEO's covered vehicles. 
              Whether it's staying dry during unexpected rain or cool in AC cars during summer, CABBIEO provides 
              the comfort bike services simply cannot.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Smart Choice for Chambal</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For Gwalior, Morena, Bhind, Sheopur, Datia, and Shivpuri residents, CABBIEO offers the perfect 
              balance. Need a quick solo ride? Choose a bike at ₹19. Traveling with family? Pick an e-rickshaw 
              at ₹29. Going to the airport? Book a car at ₹99. One platform, infinite possibilities—that's the 
              CABBIEO advantage over single-option bike services.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsBikeTaxis;