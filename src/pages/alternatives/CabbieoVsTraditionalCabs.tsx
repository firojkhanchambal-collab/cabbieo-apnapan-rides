import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight, DollarSign, MapPin, Shield, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoVsTraditionalCabs = () => {
  const comparisonData = [
    {
      category: "Booking Method",
      cabbieo: "Easy app-based booking with instant confirmation and advance payment",
      competitor: "Phone calls, waiting for availability, manual negotiations",
      winner: "CABBIEO"
    },
    {
      category: "Pricing Transparency",
      cabbieo: "Fixed rates displayed upfront: ₹19 (Bike), ₹29 (E-rickshaw), ₹39 (Auto), ₹99 (Car)",
      competitor: "Negotiable fares, meter manipulation, often disputed final amount",
      winner: "CABBIEO"
    },
    {
      category: "Driver Verification",
      cabbieo: "All drivers verified with background checks, license verification, and approvals",
      competitor: "Limited or no verification, safety concerns",
      winner: "CABBIEO"
    },
    {
      category: "Payment Options",
      cabbieo: "Digital payment with 20% advance, remaining after ride. Secure Razorpay integration",
      competitor: "Cash only, change issues, no digital record",
      winner: "CABBIEO"
    },
    {
      category: "Vehicle Tracking",
      cabbieo: "Real-time GPS tracking, share trip with family, estimated arrival time",
      competitor: "No tracking, family unaware of location or safety",
      winner: "CABBIEO"
    },
    {
      category: "Customer Support",
      cabbieo: "In-app support, local language assistance, quick resolution",
      competitor: "No formal support system, disputes hard to resolve",
      winner: "CABBIEO"
    },
    {
      category: "Ride History",
      cabbieo: "Complete digital record of all trips, invoices, and payments",
      competitor: "No record keeping, difficult for expense tracking",
      winner: "CABBIEO"
    },
    {
      category: "Local Knowledge",
      cabbieo: "Verified local drivers with regional expertise",
      competitor: "Local drivers with good area knowledge",
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
              CABBIEO vs Traditional Cab Apps
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the difference between modern app-based booking and traditional cab services
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
                <CardDescription>Modern App-Based Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Instant booking via app</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Fixed transparent pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Verified drivers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Digital payments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  Traditional Cab Services
                </CardTitle>
                <CardDescription>Phone-Based Booking</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Phone calls required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Negotiable/unclear fares</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>Limited verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span>No tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Local knowledge</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th className="border p-4 text-left">Feature</th>
                    <th className="border p-4 text-left">CABBIEO</th>
                    <th className="border p-4 text-left">Traditional Cab Services</th>
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
            <h2 className="text-3xl font-bold text-center mb-12">Real-Life Scenarios</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario 1: Early Morning Airport Drop</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">With CABBIEO:</h4>
                    <p className="text-sm text-muted-foreground">
                      Book ride night before, get confirmation, track driver arrival, fixed ₹99+ fare, 
                      digital payment, share trip with family.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Traditional Cab:</h4>
                    <p className="text-sm text-muted-foreground">
                      Multiple morning calls, driver availability uncertain, negotiate fare, cash payment 
                      issues, no way to share location.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scenario 2: Daily Office Commute</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">With CABBIEO:</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular bookings at same time, consistent pricing starting ₹19-39, digital payment 
                      records for reimbursement, trip history available.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Traditional Cab:</h4>
                    <p className="text-sm text-muted-foreground">
                      Daily negotiation hassle, varying fares, no expense records, cash handling every day, 
                      no proof for company reimbursement.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scenario 3: Night Time Travel Safety</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">With CABBIEO:</h4>
                    <p className="text-sm text-muted-foreground">
                      Verified driver details, live tracking shared with family, in-app emergency support, 
                      complete ride history, driver ratings visible.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-2">Traditional Cab:</h4>
                    <p className="text-sm text-muted-foreground">
                      Unknown driver, no verification, family can't track location, no emergency support 
                      system, safety concerns.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Winner Declaration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/50 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Clear Winner: CABBIEO</CardTitle>
                <CardDescription className="text-lg">Modern convenience meets local expertise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      CABBIEO Advantages:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Modern app technology with easy booking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Complete transparency in pricing and driver details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Safety features with real-time tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Digital payment records for convenience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Local drivers who know Chambal region</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Traditional Cabs Limitations:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Time-consuming phone-based booking</li>
                      <li>• Fare disputes and negotiations</li>
                      <li>• Limited safety and tracking features</li>
                      <li>• Cash-only payment inconvenience</li>
                      <li>• No formal customer support</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center pt-6">
                  <Link to="/">
                    <Button size="lg" className="gap-2">
                      Experience CABBIEO Today <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Why CABBIEO is Revolutionizing Chambal Transportation</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Traditional cab services have served the Chambal region for years, but they come with significant 
              limitations in today's digital age. CABBIEO combines the best of both worlds: local expertise of 
              traditional cabs with modern technology and convenience.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Technology Advantage</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              With CABBIEO's app, booking a ride takes seconds. No more calling multiple operators, waiting 
              for callbacks, or negotiating fares. Everything is transparent, instant, and documented. The app 
              shows available drivers, estimated fares, and allows you to track your ride in real-time.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Safety First Approach</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Unlike traditional cabs where driver verification is minimal, CABBIEO conducts thorough background 
              checks. Every ride is tracked, driver details are shared with you, and family members can monitor 
              your journey. This level of safety was impossible with traditional cab services.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Best Choice for Modern Chambal</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CABBIEO doesn't just replace traditional cabs—it enhances the entire experience while maintaining 
              the local connection. Drivers are still from your community, but now they're verified, tracked, 
              and accountable. Pricing is still affordable, but now it's transparent and fair. The future of 
              Chambal transportation is here with CABBIEO.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CabbieoVsTraditionalCabs;