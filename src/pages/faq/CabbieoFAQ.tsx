import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const CabbieoFAQ = () => {
  const faqs = [
    {
      question: "What is CABBIEO?",
      answer: "CABBIEO is a smart local and outstation ride-booking platform serving the Chambal region. We connect riders with verified drivers for e-rickshaw, bike, car, ambulance, and outstation trips. Our mission is to make travel simpler, affordable, and people-driven."
    },
    {
      question: "Which cities does CABBIEO serve?",
      answer: "CABBIEO currently operates across the Chambal division including Gwalior, Morena, Bhind, Sheopur, Datia, and Shivpuri. We're continuously expanding our services to more cities in Madhya Pradesh."
    },
    {
      question: "How do I book a ride?",
      answer: "Booking a ride is simple: Visit our website, enter your pickup and drop locations, select your preferred vehicle type (e-rickshaw, bike, car, etc.), choose date and time, provide your contact number, and confirm your booking. You can also call our support team directly."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept multiple payment methods including cash, UPI, credit/debit cards, and digital wallets. Payment can be made directly to the driver or through our online payment gateway."
    },
    {
      question: "Are CABBIEO drivers verified?",
      answer: "Yes, absolutely. All our driver partners undergo thorough background verification, document checks, and training before joining the platform. We prioritize rider safety and only work with trusted, professional drivers."
    },
    {
      question: "Can I book a ride in advance?",
      answer: "Yes, you can book rides in advance. This is especially useful for outstation trips, airport transfers, or when you need transportation at specific times. Simply select your preferred date and time while booking."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "You can cancel your booking by contacting our support team. Cancellation charges may apply depending on when you cancel. Free cancellation is available if you cancel at least 1 hour before the scheduled pickup time."
    },
    {
      question: "Does CABBIEO offer ambulance services?",
      answer: "Yes, we provide emergency ambulance services with trained medical staff. This service is available 24/7 across all our operating cities. Call our emergency helpline for immediate assistance."
    },
    {
      question: "How are fares calculated?",
      answer: "Our fares are transparent and based on distance, vehicle type, and trip duration. Unlike other platforms, we don't have surge pricing. You'll see the estimated fare before booking, with no hidden charges."
    },
    {
      question: "Can I become a CABBIEO driver partner?",
      answer: "Yes! We welcome driver partners who own e-rickshaws, bikes, cars, or ambulances. You'll need valid documents, vehicle registration, and insurance. Contact our driver partner team to learn about earnings, flexible schedules, and support benefits."
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
          Frequently Asked Questions
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Everything you need to know about CABBIEO - your trusted ride-booking partner
        </p>

        {/* FAQ Accordion */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-poppins font-semibold text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-12 text-center">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is here to help 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90">
                Contact Support
              </Button>
              <Link to="/">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Book a Ride
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Related Links */}
        <div className="mt-16">
          <h2 className="font-poppins font-bold text-2xl mb-6">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/faq/safe-and-hygienic-rides">
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Safety & Hygiene</h3>
                  <p className="text-muted-foreground text-sm">Learn about our safety measures</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/faq/driver-flexible-earning">
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Driver Partners</h3>
                  <p className="text-muted-foreground text-sm">Join as a driver partner</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/faq/transparent-affordable-pricing">
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="font-poppins font-semibold text-lg mb-2">Pricing Info</h3>
                  <p className="text-muted-foreground text-sm">Transparent fare structure</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CabbieoFAQ;