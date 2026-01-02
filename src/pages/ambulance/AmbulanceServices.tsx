import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Heart, 
  Shield, 
  Stethoscope,
  Activity,
  Wind,
  Siren,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Zap
} from 'lucide-react';
import Footer from '@/components/Footer';
import StickyCtaButtons from '@/components/StickyCtaButtons';

const AmbulanceServices = () => {
  const EMERGENCY_PHONE = "011-69652647";
  const WHATSAPP_PHONE = "918109185295";

  const ambulanceTypes = [
    {
      id: 'bls',
      name: 'Basic Life Support (BLS)',
      shortName: 'BLS Ambulance',
      tagline: 'Essential Emergency Care',
      description: 'Ideal for stable patients requiring medical transport with basic emergency equipment and trained EMTs.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      icon: Heart,
      startingPrice: '₹999',
      features: [
        { icon: Wind, text: 'Oxygen support & delivery system' },
        { icon: Shield, text: 'Complete first-aid equipment' },
        { icon: Users, text: 'Trained EMT attendants' },
        { icon: MapPin, text: 'Patient stretcher & transport' },
        { icon: Activity, text: 'Basic vital monitoring' },
        { icon: Phone, text: '24/7 dispatch availability' },
      ],
      idealFor: ['Hospital transfers', 'Non-emergency transport', 'Dialysis patients', 'Elderly care transport'],
      responseTime: '15-20 mins',
    },
    {
      id: 'mls',
      name: 'Medium Life Support (MLS)',
      shortName: 'MLS Ambulance',
      tagline: 'Enhanced Emergency Response',
      description: 'For patients needing advanced monitoring and intermediate-level emergency care during transit.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-100',
      icon: Activity,
      startingPrice: '₹1,999',
      features: [
        { icon: Activity, text: 'Cardiac monitoring equipment' },
        { icon: Wind, text: 'Advanced oxygen therapy' },
        { icon: Stethoscope, text: 'Trained paramedic staff' },
        { icon: Zap, text: 'Defibrillator on board' },
        { icon: Shield, text: 'IV fluid administration' },
        { icon: Siren, text: 'Priority emergency response' },
      ],
      idealFor: ['Heart patients', 'Respiratory emergencies', 'Post-surgery transfers', 'Trauma cases'],
      responseTime: '10-15 mins',
    },
    {
      id: 'als',
      name: 'Advanced Life Support (ALS)',
      shortName: 'ALS Ambulance',
      tagline: 'ICU-Grade Emergency Care',
      description: 'Mobile ICU for critical patients requiring ventilator support, intensive monitoring, and doctor assistance.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      icon: Stethoscope,
      startingPrice: '₹3,999',
      features: [
        { icon: Wind, text: 'Ventilator & life support' },
        { icon: Stethoscope, text: 'Doctor / paramedic onboard' },
        { icon: Activity, text: 'ICU-grade equipment' },
        { icon: Heart, text: 'Cardiac life support' },
        { icon: Shield, text: 'Emergency medications' },
        { icon: Siren, text: 'Priority response under 10 mins' },
      ],
      idealFor: ['Critical emergencies', 'ICU transfers', 'Ventilator patients', 'Major trauma/accidents'],
      responseTime: '5-10 mins',
    },
  ];

  const trustBadges = [
    { icon: Clock, label: '24/7 Available', value: 'Round the Clock' },
    { icon: Zap, label: 'Response Time', value: 'Under 10 mins' },
    { icon: Users, label: 'Trained Staff', value: '100+ EMTs' },
    { icon: MapPin, label: 'Coverage', value: 'Pan India' },
  ];

  const faqs = [
    {
      question: "How quickly can an ambulance reach me?",
      answer: "Our average response time is 10-15 minutes in urban areas. For ALS ambulances, we prioritize under 10-minute response for critical emergencies."
    },
    {
      question: "What documents are needed for ambulance booking?",
      answer: "For emergency bookings, no documents are required. For planned transfers, we may need patient details and hospital referral if applicable."
    },
    {
      question: "Are your ambulances equipped with oxygen?",
      answer: "Yes, all our ambulances (BLS, MLS, and ALS) are equipped with oxygen support systems. ALS ambulances also have ventilators."
    },
    {
      question: "Do you provide ambulance service for outstation transfers?",
      answer: "Yes, we provide ambulance services for inter-city and outstation patient transfers with all necessary medical equipment."
    },
    {
      question: "Is there a doctor available in the ambulance?",
      answer: "Our ALS (Advanced Life Support) ambulances come with a qualified doctor or senior paramedic. MLS and BLS have trained EMT staff."
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmergencyService",
        "name": "Cabbieo Ambulance Service",
        "description": "24/7 Emergency Ambulance Service with Basic, Medium, and Advanced Life Support options. GPS-tracked ambulances with trained medical staff.",
        "url": "https://cabbieo.com/ambulance",
        "telephone": EMERGENCY_PHONE,
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://cabbieo.com/ambulance",
          "servicePhone": EMERGENCY_PHONE,
          "availableLanguage": ["English", "Hindi"]
        },
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "provider": {
          "@type": "LocalBusiness",
          "name": "Cabbieo"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>24/7 Emergency Ambulance Service | BLS, MLS, ALS Ambulance Booking | Cabbieo</title>
        <meta name="description" content="Book emergency ambulance service 24/7. Basic Life Support (BLS), Medium Life Support (MLS) & Advanced Life Support (ALS) ambulances with trained EMTs, ventilators & ICU equipment. Fast response under 10 minutes." />
        <meta name="keywords" content="emergency ambulance service, ambulance booking near me, 24/7 ambulance service, BLS ambulance, MLS ambulance, ALS ambulance, ICU ambulance, ventilator ambulance, ambulance service India, medical emergency transport" />
        <link rel="canonical" href="https://cabbieo.com/ambulance" />
        <meta property="og:title" content="24/7 Emergency Ambulance Service | Cabbieo" />
        <meta property="og:description" content="Book emergency ambulance service 24/7. BLS, MLS & ALS ambulances with trained medical staff. Response under 10 minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cabbieo.com/ambulance" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Emergency Header Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <Siren className="w-5 h-5 animate-pulse" />
            <span className="font-bold">MEDICAL EMERGENCY?</span>
            <a 
              href={`tel:${EMERGENCY_PHONE}`} 
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-red-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now: {EMERGENCY_PHONE}
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-blue-50 opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Siren className="w-4 h-4 animate-pulse" />
                24/7 Emergency Ambulance Service
              </div>
              
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
                <span className="text-red-600">Life-Saving</span> Ambulance Services
                <br />
                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">When Every Second Counts</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                From basic patient transport to ICU-grade emergency care, our fleet of GPS-tracked ambulances 
                with trained medical professionals is ready to respond within minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <a href={`tel:${EMERGENCY_PHONE}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Emergency: {EMERGENCY_PHONE}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-xl"
                >
                  <Link to="/#booking">
                    Book Ambulance Online
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-lg border text-center hover:shadow-xl transition-shadow">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold text-foreground">{badge.value}</p>
                    <p className="text-sm text-muted-foreground">{badge.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ambulance Types Section */}
        <section className="py-16 md:py-24 bg-white" id="ambulance-types">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-foreground">
                Choose the Right <span className="text-red-600">Ambulance Service</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We offer three levels of ambulance services to match your medical needs - from basic transport to full ICU care.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {ambulanceTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.id} 
                    className={`relative overflow-hidden border-2 ${type.borderColor} hover:shadow-2xl transition-all duration-300 group`}
                  >
                    {/* Top Gradient Bar */}
                    <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                    
                    <CardHeader className={`${type.bgColor} pb-4`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`w-14 h-14 ${type.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7 text-foreground" />
                          </div>
                          <CardTitle className="text-xl font-bold mb-1">{type.shortName}</CardTitle>
                          <p className="text-sm font-medium text-muted-foreground">{type.tagline}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className={`text-2xl font-bold bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>
                            {type.startingPrice}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                      <p className="text-muted-foreground">{type.description}</p>

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                          Equipment & Services
                        </h4>
                        <ul className="space-y-2">
                          {type.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <li key={idx} className="flex items-center gap-3 text-sm">
                                <FeatureIcon className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{feature.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Ideal For */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                          Ideal For
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {type.idealFor.map((use, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-3 py-1 rounded-full ${type.bgColor} ${type.borderColor} border`}
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Response Time & CTA */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Response: <strong>{type.responseTime}</strong></span>
                          </div>
                        </div>
                        <Button 
                          asChild
                          className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white py-6 rounded-xl font-bold group-hover:shadow-lg transition-all`}
                        >
                          <Link to="/#booking">
                            Book {type.shortName}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-foreground">
                Why Choose <span className="text-primary">Cabbieo Ambulance</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Fastest Response",
                  description: "Average response time under 10 minutes with GPS-tracked fleet"
                },
                {
                  icon: Stethoscope,
                  title: "Trained Medical Staff",
                  description: "EMTs, paramedics, and doctors trained in emergency care"
                },
                {
                  icon: Shield,
                  title: "Fully Equipped",
                  description: "Modern equipment from oxygen to ventilators and defibrillators"
                },
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  description: "Round-the-clock emergency ambulance service, 365 days"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-muted-foreground">Quick answers to common queries about our ambulance services</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <Siren className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Need Emergency Ambulance?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don't wait. Every second matters. Call us now or book online.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-red-600 hover:bg-red-50 px-8 py-6 text-lg rounded-xl font-bold shadow-xl"
              >
                <a href={`tel:${EMERGENCY_PHONE}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {EMERGENCY_PHONE}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl font-bold"
              >
                <Link to="/#booking">
                  Book Ambulance Online
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <StickyCtaButtons />
      </main>
    </>
  );
};

export default AmbulanceServices;
