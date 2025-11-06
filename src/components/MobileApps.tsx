import { Smartphone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MobileApps = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚖 Experience Smart Travel with Cabbieo!
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            अब सफर हो आसान और कमाई हो दुगुनी!
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            हमारे दोनों ऐप्स डाउनलोड करें और जुड़ें हमारे स्मार्ट ट्रांसपोर्ट नेटवर्क से 👇
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Customer App Card */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg animate-fade-up">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">📱 For Customers:</h3>
              <p className="text-lg font-semibold mb-4">
                Cabbieo - Book Auto, Cab & Bike
              </p>
              <Button 
                className="w-full max-w-xs"
                size="lg"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.taxigo.proapp', '_blank')}
              >
                👉 Download Now on Google Play
              </Button>
            </CardContent>
          </Card>

          {/* Driver App Card */}
          <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">🚗 For Drivers:</h3>
              <p className="text-lg font-semibold mb-4">
                Cabbieo Drive: Earn & Grow
              </p>
              <Button 
                className="w-full max-w-xs"
                size="lg"
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.taxigo.propilot', '_blank')}
              >
                👉 Download Now on Google Play
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.2s' }}>
          🌐 आसान बुकिंग, भरोसेमंद सफर और बेहतर कमाई — सब कुछ Cabbieo के साथ!
        </div>
      </div>
    </section>
  );
};

export default MobileApps;
