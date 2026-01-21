import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Car, Armchair } from "lucide-react";
import PackageBookingSection from "@/components/package-booking/PackageBookingSection";

interface UnifiedBookingAreaProps {
  cabBookingContent: React.ReactNode;
}

const UnifiedBookingArea = ({ cabBookingContent }: UnifiedBookingAreaProps) => {
  const [activeTab, setActiveTab] = useState<"cab" | "package">("cab");

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Book in 60 Seconds!
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            🚗 Book Your Ride!
          </h2>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
          
          <CardContent className="p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "cab" | "package")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-14 p-1 bg-muted/50">
                <TabsTrigger value="cab" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-xl">
                  <Car className="w-5 h-5" />
                  <span className="hidden sm:inline">🚕 Book Cab</span>
                  <span className="sm:hidden">🚕 Cab</span>
                </TabsTrigger>
                <TabsTrigger value="package" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-xl">
                  <Armchair className="w-5 h-5" />
                  <span className="hidden sm:inline">🪑 Package Seat</span>
                  <span className="sm:hidden">🪑 Package</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cab" className="mt-0">
                {cabBookingContent}
              </TabsContent>

              <TabsContent value="package" className="mt-0">
                <PackageBookingSection />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UnifiedBookingArea;
