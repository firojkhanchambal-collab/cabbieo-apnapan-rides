import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Car, Loader2 } from "lucide-react";

interface PricingConfig {
  id: string;
  vehicle_type: string;
  rate_per_km: number;
  base_fare: number;
}

const PricingSection = () => {
  const [pricing, setPricing] = useState<PricingConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from("pricing_config")
        .select("*")
        .order("vehicle_type");

      if (error) throw error;
      setPricing(data || []);
    } catch (error) {
      console.error("Error fetching pricing:", error);
      toast({
        title: "Error",
        description: "Failed to load pricing configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePricing = async (id: string, field: string, value: number) => {
    setSaving(id);
    try {
      const { error } = await supabase
        .from("pricing_config")
        .update({ [field]: value })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "✅ Updated",
        description: "Pricing updated successfully",
      });
      
      fetchPricing();
    } catch (error) {
      console.error("Error updating pricing:", error);
      toast({
        title: "Error",
        description: "Failed to update pricing",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const getVehicleLabel = (type: string) => {
    const labels: Record<string, string> = {
      auto: "🛺 Auto Rickshaw",
      car: "🚗 Car (Sedan)",
      suv: "🚙 SUV",
      outstation: "🚗 Outstation",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Car className="h-6 w-6" />
        <h2 className="text-2xl font-bold">प्राइसिंग कॉन्फ़िगरेशन</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pricing.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <CardTitle>{getVehicleLabel(config.vehicle_type)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`base-${config.id}`}>बेस किराया (₹)</Label>
                <Input
                  id={`base-${config.id}`}
                  type="number"
                  value={config.base_fare}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setPricing(prev =>
                      prev.map(p =>
                        p.id === config.id ? { ...p, base_fare: newValue } : p
                      )
                    );
                  }}
                  onBlur={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (newValue !== config.base_fare) {
                      updatePricing(config.id, "base_fare", newValue);
                    }
                  }}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`rate-${config.id}`}>
                  प्रति किलोमीटर दर (₹)
                </Label>
                <Input
                  id={`rate-${config.id}`}
                  type="number"
                  value={config.rate_per_km}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setPricing(prev =>
                      prev.map(p =>
                        p.id === config.id ? { ...p, rate_per_km: newValue } : p
                      )
                    );
                  }}
                  onBlur={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (newValue !== config.rate_per_km) {
                      updatePricing(config.id, "rate_per_km", newValue);
                    }
                  }}
                  className="mt-1"
                />
              </div>
              {saving === config.id && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            💡 <strong>नोट:</strong> बेस किराया + (दूरी × प्रति किमी दर) = कुल किराया
            <br />
            ग्राहक को 20% एडवांस पेमेंट करना होगा बुकिंग कन्फर्म करने के लिए।
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
