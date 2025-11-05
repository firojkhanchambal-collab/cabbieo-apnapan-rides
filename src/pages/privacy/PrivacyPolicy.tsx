import { Link } from "react-router-dom";
import { Shield, Lock, Users, FileText, Bell, MapPin, Baby, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import cabbieoLogo from "@/assets/cabbieo-logo.png";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FileText,
      title: "1.1 Data Collection",
      content: [
        "Personal information: name, mobile number, and email address",
        "Payment details: UPI, debit/credit card, or digital wallet information",
        "Real-time location data: for ride matching, tracking, and navigation",
        "User-generated content: ratings, reviews, feedback, and chat or call records",
        "Technical data: device ID, IP address, and app usage patterns"
      ]
    },
    {
      icon: Users,
      title: "1.2 Data Usage",
      content: [
        "Booking rides and processing payments",
        "Ensuring rider and driver safety",
        "Enhancing your app experience through recommendations and updates",
        "Customer service, communication, and resolving disputes",
        "Detecting fraud or violations of terms"
      ]
    },
    {
      icon: Shield,
      title: "1.3 Data Sharing",
      content: [
        "We do not sell your personal data to third parties.",
        "We may share data with trusted partners like payment gateways, SMS providers, and law enforcement, only when necessary.",
        "All data sharing is governed by strict confidentiality agreements and legal obligations."
      ]
    },
    {
      icon: Lock,
      title: "1.4 Data Security",
      content: [
        "Your data is secured using encryption, secure servers, and access control technologies.",
        "We take reasonable measures to prevent unauthorized access, loss, or misuse of data.",
        "Users are responsible for protecting their login credentials (passwords, OTPs, etc.)."
      ]
    },
    {
      icon: FileText,
      title: "1.5 User Rights",
      content: [
        "Request access to your data",
        "Request correction or deletion of your data",
        "Disable location tracking via app or device settings",
        "To exercise your rights, contact: support@cabbieo.com"
      ]
    },
    {
      icon: MapPin,
      title: "1.6 Location Permissions",
      content: [
        "Location access is required to find and assign nearby drivers.",
        "You can manage or disable location permissions anytime through your phone settings.",
        "Without location access, certain app features may not function properly."
      ]
    },
    {
      icon: Baby,
      title: "1.7 Children's Privacy",
      content: [
        "Our services are intended for users 18 years and above.",
        "We do not knowingly collect data from minors.",
        "If you believe a child has used the app, please contact us immediately."
      ]
    },
    {
      icon: Bell,
      title: "1.8 Updates to Privacy Policy",
      content: [
        "We may update this Privacy Policy periodically.",
        "Major changes will be communicated via app notifications or email.",
        "Continued use of the service after an update indicates your acceptance of the new terms."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={cabbieoLogo} alt="CABBIEO" className="h-10 w-auto" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 animate-scale-in">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your privacy matters to us
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Effective Date: 05 Nov 2025</span>
              <span>•</span>
              <span>Last Updated: 05 Nov 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At CABBIEO, we are committed to protecting your personal data and privacy. 
              This policy explains how we collect, use, share, and safeguard your information, 
              along with your rights regarding that data.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Policy Sections */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg font-semibold text-left">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-3 mt-4">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              1.9 Contact Information
            </CardTitle>
            <CardDescription>
              If you have any questions, concerns, or data-related requests, you may contact us at:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Customer Support</p>
                    <a href="mailto:info@cabbieo.com" className="text-primary hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Driver Support</p>
                    <a href="mailto:info@cabbieo.com" className="text-primary hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Partnerships</p>
                    <a href="mailto:info@cabbieo.com" className="text-primary hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Legal / Data Concerns</p>
                    <a href="mailto:cabbieollp@gmail.com" className="text-primary hover:underline">
                      cabbieollp@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:01169652647" className="text-primary hover:underline">
                      011-69652647
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Website</p>
                    <a href="https://cabbieo.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://cabbieo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto text-center border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team is here to help you understand how we protect your privacy and data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href="mailto:info@cabbieo.com">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
