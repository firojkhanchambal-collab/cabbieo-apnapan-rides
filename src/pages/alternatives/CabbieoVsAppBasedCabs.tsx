import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight, DollarSign, MapPin, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsAppBasedCabs = () => {
  const comparisonData = [
    {
      category: "Pricing Strategy",
      cabbieo: "Transparent flat rates starting from ₹19 for bikes, ₹29 for e-rickshaws, ₹39 for autos, ₹99 for cars. No surge pricing.",
      competitor: "Dynamic pricing with surge multipliers during peak hours, often 1.5x to 3x normal rates",
      winner: "CABBIEO"
    },
    {
      category: "Regional Coverage",
      cabbieo: "Specialized focus on Chambal region (Gwalior, Morena, Bhind, Sheopur, Datia, Shivpuri) with local expertise",
      competitor: "Major cities focus with limited presence in tier-2 and tier-3 cities",
      winner: "CABBIEO"
    },
    {
      category: "Vehicle Options",
      cabbieo: "Comprehensive range: Bikes, E-rickshaws, Autos, and Cars - suited for all budgets",
      competitor: "Primarily cars and premium vehicles, limited budget options",
      winner: "CABBIEO"
    },
    {
      category: "Local Knowledge",
      cabbieo: "Drivers are local residents with deep knowledge of the region",
      competitor: "Drivers may not be familiar with local routes and landmarks",
      winner: "CABBIEO"
    },
    {
      category: "Customer Support",
      cabbieo: "Direct local support with understanding of regional language and culture",
      competitor: "Centralized call centers, language barriers possible",
      winner: "CABBIEO"
    },
    {
      category: "Commission Structure",
      cabbieo: "Fair 5-15% commission, allowing drivers to earn more",
      competitor: "High commission rates of 20-30%, reducing driver earnings",
      winner: "CABBIEO"
    },
    {
      category: "Booking Process",
      cabbieo: "Simple booking with instant confirmation and 20% advance payment",
      competitor: "Multiple cancellations, driver unavailability during peak hours",
      winner: "CABBIEO"
    },
    {
      category: "Safety Features",
      cabbieo: "Verified drivers, trip tracking, emergency support with local police coordination",
      competitor: "Standard safety features, but limited local emergency response",
      winner: "Tie"
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
              CABBIEO vs App-Based Cab Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive comparison between CABBIEO and popular app-based cab services
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="gap-2">
                  Book with CABBIEO <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img src="/src/assets/cabbieo-logo.png" alt="CABBIEO" className="h-8" />
                  CABBIEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Starting from ₹19 (Bike)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>No surge pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Local expertise in Chambal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>4 vehicle categories</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle>App-Based Cab Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Higher base fares</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Surge pricing during peak</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Limited tier-2/3 city coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Wide urban availability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature-by-Feature Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Feature-by-Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th className="border p-4 text-left">Category</th>
                    <th className="border p-4 text-left">CABBIEO</th>
                    <th className="border p-4 text-left">App-Based Cab Services</th>
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

      {/* Pricing Deep Dive */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Real-World Pricing Examples</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Local Ride
                  </CardTitle>
                  <CardDescription>5 km within city</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-primary">CABBIEO (Bike)</p>
                      <p className="text-2xl font-bold">₹19-95</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">App-Based Service</p>
                      <p className="text-2xl font-bold">₹150-250</p>
                      <p className="text-sm text-red-600">*With surge pricing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Outstation Trip
                  </CardTitle>
                  <CardDescription>50 km one-way</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-primary">CABBIEO (Car)</p>
                      <p className="text-2xl font-bold">₹4,999</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">App-Based Service</p>
                      <p className="text-2xl font-bold">₹7,500-9,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Monthly Commute
                  </CardTitle>
                  <CardDescription>10 km daily (22 days)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-primary">CABBIEO (Auto)</p>
                      <p className="text-2xl font-bold">₹8,580</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">App-Based Service</p>
                      <p className="text-2xl font-bold">₹13,200-16,500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Verdict */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">The Verdict</CardTitle>
                <CardDescription className="text-lg">CABBIEO is the Clear Winner for Chambal Region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Choose CABBIEO if you want:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Affordable, transparent pricing without surge charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Local drivers who know the Chambal region intimately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Multiple vehicle options from bikes to cars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Support a local business and community drivers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Consider App-Based Services if:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">• You're traveling in major metro cities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">• You need premium vehicle options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">• Price is not a primary concern</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-center pt-6">
                  <Link to="/">
                    <Button size="lg" className="gap-2">
                      Book Your Ride with CABBIEO Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Article Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">CABBIEO vs App-Based Cab Services: A Complete Analysis</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">The Rise of Regional Ride-Booking Platforms</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              While large app-based cab services revolutionized urban transportation in metros, they often overlook 
              tier-2 and tier-3 cities like those in the Chambal region. CABBIEO bridges this gap by providing 
              affordable, reliable transportation specifically designed for Gwalior, Morena, Bhind, Sheopur, Datia, 
              and Shivpuri.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Why CABBIEO Wins in Chambal Region</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Affordability:</strong> With bike rides starting at just ₹19 and no surge pricing, CABBIEO 
              offers consistent, budget-friendly fares. App-based services often charge 2-3x during peak hours, 
              making daily commutes expensive.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Local Expertise:</strong> CABBIEO drivers are local residents who understand regional routes, 
              landmarks, and can communicate in local languages. This eliminates the confusion and time wastage 
              common with drivers from other platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong>Vehicle Variety:</strong> From eco-friendly e-rickshaws at ₹29 to comfortable cars at ₹99, 
              CABBIEO provides options for every budget and need. Most app-based services focus primarily on cars, 
              limiting affordable choices.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Making the Right Choice for Your Needs</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you live in or travel within the Chambal region, CABBIEO is designed specifically for you. 
              The platform's understanding of local needs, transparent pricing, and commitment to the community 
              make it the superior choice over generic app-based services that treat all cities the same.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsAppBasedCabs;