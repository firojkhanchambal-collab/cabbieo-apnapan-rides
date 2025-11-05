import { Link } from "react-router-dom";
import { FileText, Users, Car, RefreshCw, AlertTriangle, Shield, Scale, Mail, Phone, Globe, Wallet, Ban, CheckCircle, XCircle, IndianRupee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import cabbieoLogo from "@/assets/cabbieo-logo.png";

const TermsAndConditions = () => {
  const sections = [
    {
      icon: Users,
      title: "2. User Terms",
      subsections: [
        {
          subtitle: "2.1 Responsibilities",
          content: [
            "Users must provide accurate details during registration (name, mobile number, location, payment info)",
            "Respectful and polite behavior towards drivers is mandatory",
            "Illegal activity or transport of prohibited items is not allowed"
          ]
        },
        {
          subtitle: "2.2 Booking Conduct",
          content: [
            "Passengers must be present at the pickup location on time",
            "If a user is late or unavailable, the ride may be canceled"
          ]
        },
        {
          subtitle: "2.3 Payments and Charges",
          content: [
            "Fares are calculated by the app and must be paid by the user",
            "Late cancellations may result in a cancellation fee",
            "Additional charges may apply for waiting time, route changes, or premium services"
          ]
        },
        {
          subtitle: "2.4 Account Security",
          content: [
            "Users should not share login details (OTP, passwords) with others",
            "Any suspicious activity must be reported to customer support immediately"
          ]
        },
        {
          subtitle: "2.5 Suspension / Termination",
          content: [
            "Accounts may be suspended or terminated for violating company policy, misconduct, or non-payment"
          ]
        }
      ]
    },
    {
      icon: Car,
      title: "3. Driver Terms",
      subsections: [
        {
          subtitle: "3.1 Eligibility and Documents",
          content: [
            "Drivers must have a valid driving license, vehicle documents, and insurance",
            "Documents must be regularly updated and verified on the platform"
          ]
        },
        {
          subtitle: "3.2 Professional Conduct",
          content: [
            "Drivers must behave courteously with passengers",
            "Follow all traffic rules and ensure passenger safety",
            "Discrimination based on caste, religion, or region is strictly prohibited"
          ]
        },
        {
          subtitle: "3.3 Earnings and Payments",
          content: [
            "Driver income is based on completed rides, after deduction of platform commission",
            "Payments are transferred weekly to the registered bank account or wallet"
          ]
        },
        {
          subtitle: "3.4 Ride Cancellation Rules",
          content: [
            "Drivers may cancel rides if users provide false info or cannot be reached",
            "Repeated unjustified cancellations may result in warnings or penalties"
          ]
        },
        {
          subtitle: "3.5 Violation of Rules",
          content: [
            "Non-compliance with company policies can lead to permanent account suspension"
          ]
        },
        {
          subtitle: "3.6 Vehicle Compliance & Registration Policy",
          content: [
            "CABBIEO strictly accepts only commercially registered vehicles (Yellow Plate / Taxi Registration)",
            "Unauthorized private vehicles (White Plate) may result in suspension, termination, and full legal responsibility on the driver",
            "Submission of false documents may trigger strict legal action"
          ]
        }
      ]
    },
    {
      icon: RefreshCw,
      title: "4. Refund and Cancellation Policy",
      subsections: [
        {
          subtitle: "Cancellation Terms",
          content: [
            "Rides canceled within 5 minutes of booking are free",
            "Late cancellations incur a cancellation fee",
            "If driver does not arrive, refunds are processed within 10–15 business days",
            "No-shows may incur charges, and driver may be compensated"
          ]
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "5. Emergency SOS",
      subsections: [
        {
          subtitle: "Safety Features",
          content: [
            "An SOS button is available in-app to alert emergency contacts and local authorities",
            "Real-time location is shared during emergencies",
            "Misuse of SOS feature may result in suspension"
          ]
        }
      ]
    },
    {
      icon: Shield,
      title: "6. Limitation of Liability",
      subsections: [
        {
          subtitle: "Platform Responsibility",
          content: [
            "CABBIEO is only a technology platform; we do not provide transport services directly",
            "We are not liable for accidents, loss of belongings, or disputes",
            "Users and drivers are responsible for legal and safety compliance"
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "7. Modifications to Terms",
      subsections: [
        {
          subtitle: "Updates",
          content: [
            "Terms may be updated; changes posted on app/website",
            "Continued use constitutes acceptance of updated terms"
          ]
        }
      ]
    },
    {
      icon: Scale,
      title: "8. Dispute Resolution",
      subsections: [
        {
          subtitle: "Resolution Process",
          content: [
            "Contact customer support first for any disputes",
            "Legal jurisdiction: Morena, Madhya Pradesh, India"
          ]
        }
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
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 animate-scale-in">
              <FileText className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Please read these terms carefully
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Effective Date: 28 Jun 2025</span>
              <span>•</span>
              <span>Last Updated: 29 Jun 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-accent/20 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              1. Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CABBIEO is an online mobile application that connects passengers with nearby drivers. 
              It acts as a platform service — we do not operate vehicles ourselves but facilitate ride 
              connections between users and independent drivers. By using this app, you agree to all 
              the terms and conditions mentioned below.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Terms Sections */}
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
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-lg font-semibold text-left">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6 mt-4">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h4 className="font-semibold text-md mb-3 text-accent">{subsection.subtitle}</h4>
                          <ul className="space-y-2">
                            {subsection.content.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Driver Wallet Section - Special Highlight */}
      <section className="py-12 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-accent/20 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wallet className="w-6 h-6 text-accent" />
              3.3.1 Driver Wallet & Withdrawal Policy
            </CardTitle>
            <CardDescription className="text-base">
              Important information for driver partners
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-accent/10">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Minimum Wallet Balance</p>
                    <p className="text-sm text-muted-foreground">₹500 minimum required to receive bookings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-accent/10">
                  <Ban className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">First Wallet Recharge</p>
                    <p className="text-sm text-muted-foreground">Initial ₹500 is non-refundable and activates booking functionality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-accent/10">
                  <IndianRupee className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Bonus Offer</p>
                    <p className="text-sm text-muted-foreground">₹500 bonus for new drivers who apply CABBIEO branding on their vehicle</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-accent/10">
                  <p className="font-semibold mb-3">Withdrawal Examples:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>₹1000 balance → No withdrawal allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>₹1500 balance → ₹500 can be withdrawn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>₹2500 balance → ₹1500 can be withdrawn</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-accent/10">
                  <p className="font-semibold mb-2">Important Notes:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Only amounts exceeding ₹1000 can be withdrawn</li>
                    <li>• ₹1000 is operational minimum balance</li>
                    <li>• Withdrawals processed within 3–5 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-accent/20 shadow-lg bg-gradient-to-br from-card to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Mail className="w-6 h-6 text-accent" />
              9. Contact Information
            </CardTitle>
            <CardDescription>
              If you have any questions or concerns, you may contact us at:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Customer Support</p>
                    <a href="mailto:info@cabbieo.com" className="text-accent hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Driver Support</p>
                    <a href="mailto:info@cabbieo.com" className="text-accent hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Partnerships</p>
                    <a href="mailto:info@cabbieo.com" className="text-accent hover:underline">
                      info@cabbieo.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Legal / Data Concerns</p>
                    <a href="mailto:cabbieollp@gmail.com" className="text-accent hover:underline">
                      cabbieollp@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:01169652647" className="text-accent hover:underline">
                      011-69652647
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Website</p>
                    <a href="https://cabbieo.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
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
        <Card className="max-w-4xl mx-auto text-center border-accent/20 shadow-lg bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold mb-4">Need Clarification?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our support team is available to help you understand our terms and answer your questions.
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

export default TermsAndConditions;
