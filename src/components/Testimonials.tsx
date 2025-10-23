import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import testimonialBg from "@/assets/testimonial-bg.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      city: "Gwalior",
      rating: 5,
      text: "CABBIEO ने मेरे शहर का सफर और आसान बना दिया! हमेशा समय पर और सस्ती सेवा।",
      avatar: "RK",
    },
    {
      name: "Priya Sharma",
      city: "Morena",
      rating: 5,
      text: "बहुत ही विश्वसनीय सेवा। Ambulance service की वजह से emergency में काफी मदद मिली।",
      avatar: "PS",
    },
    {
      name: "Amit Patel",
      city: "Bhind",
      rating: 5,
      text: "Driver partners बहुत अच्छे हैं। Outstation rides के लिए best option है।",
      avatar: "AP",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-4">
            What Our Riders Say
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Real experiences from real people across Chambal region
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white/95 backdrop-blur-sm border-0 hover:shadow-glow transition-all hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <Quote className="w-12 h-12 text-accent mb-4 opacity-50" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-poppins font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;