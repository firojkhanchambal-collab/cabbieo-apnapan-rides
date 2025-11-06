import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import MobileApps from "@/components/MobileApps";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <BookingForm />
      <MobileApps />
      <About />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;