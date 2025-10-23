import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const CabbieoAlternatives = () => {
  const alternatives = [
    {
      name: "Uber",
      pros: ["Wide availability", "Multiple payment options"],
      cons: ["Higher prices", "Limited local focus", "Surge pricing"],
      link: "/alternatives/cabbieo-vs-ubercom"
    },
    {
      name: "Ola",
      pros: ["Established brand", "App features"],
      cons: ["Premium pricing", "Less coverage in smaller cities"],
      link: "/alternatives/cabbieo-vs-olacabscom"
    },
    {
      name: "Rapido",
      pros: ["Bike rides", "Quick service"],
      cons: ["Limited vehicle options", "Safety concerns"],
      link: "/alternatives/cabbieo-vs-rapidobike"
    },
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
          CABBIEO Alternatives: Complete Comparison Guide
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Looking for ride-booking alternatives to CABBIEO? Here's an honest comparison of popular 
          ride-sharing platforms in India and why CABBIEO stands out for local and outstation travel.
        </p>

        {/* Why CABBIEO First */}
        <Card className="mb-12 border-2 border-primary">
          <CardContent className="p-8">
            <h2 className="font-poppins font-bold text-3xl mb-6">Why Choose CABBIEO?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-xl mb-4 text-primary">Key Advantages:</h3>
                <ul className="space-y-3">
                  {[
                    "Affordable local rates - No surge pricing",
                    "Verified driver partners from your community",
                    "Multiple vehicle options (E-rickshaw, bike, car, ambulance)",
                    "Strong local presence in Chambal region",
                    "24/7 customer support in Hindi & English",
                    "Focus on safety and transparency"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-primary rounded-xl p-8 text-white">
                <h3 className="font-poppins font-bold text-2xl mb-4">Perfect For:</h3>
                <ul className="space-y-3">
                  <li>✓ Local city rides</li>
                  <li>✓ Outstation trips</li>
                  <li>✓ Budget-conscious travelers</li>
                  <li>✓ People seeking community connection</li>
                  <li>✓ Emergency ambulance services</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternatives Comparison */}
        <h2 className="font-poppins font-bold text-3xl mb-8">Popular Alternatives</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {alternatives.map((alt, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="font-poppins font-bold text-2xl mb-4">{alt.name}</h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">PROS</h4>
                  <ul className="space-y-2">
                    {alt.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">CONS</h4>
                  <ul className="space-y-2">
                    {alt.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={alt.link}>
                  <Button variant="outline" className="w-full">
                    Detailed Comparison
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-hero text-white">
          <CardContent className="p-12 text-center">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Ready to Experience the CABBIEO Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy riders in the Chambal region
            </p>
            <Link to="/">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold">
                Book Your First Ride
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="mt-16 prose prose-lg max-w-none">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Understanding Your Ride-Booking Options
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            The ride-booking industry in India has evolved significantly, with multiple players offering 
            various services. While platforms like Uber and Ola have dominated urban markets with premium 
            pricing, CABBIEO focuses on providing affordable, community-driven transportation solutions 
            specifically tailored for the Chambal region including Gwalior, Morena, Bhind, Sheopur, Datia, 
            and Shivpuri.
          </p>

          <h3 className="font-poppins font-bold text-2xl mb-4">What Makes CABBIEO Different?</h3>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Unlike international ride-sharing giants, CABBIEO was built from the ground up with local needs 
            in mind. We offer diverse vehicle options including e-rickshaws for short local trips, bikes for 
            quick commutes, comfortable cars for family travel, and even ambulance services for medical emergencies. 
            Our driver partners are members of your community, verified and trained to provide safe, reliable service.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Whether you're looking for a daily commute solution, planning an outstation trip, or need emergency 
            transportation, CABBIEO offers transparent pricing without hidden charges or surge pricing during 
            peak hours. Experience "Har Safar Mein Apnapan" – the feeling of home in every journey.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CabbieoAlternatives;