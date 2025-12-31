import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import MobileApps from "@/components/MobileApps";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StickyCtaButtons from "@/components/StickyCtaButtons";

const Index = () => {
  return (
    <>
      <SEOHead />
      <main className="min-h-screen">
        <Hero />
        <BookingForm />
        <MobileApps />
        <About />
        <WhyChoose />
        <Testimonials />
        <Footer />
        <StickyCtaButtons />
      </main>
    </>
  );
};

export default Index;