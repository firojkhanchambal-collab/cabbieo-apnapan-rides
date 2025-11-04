-- Create pricing configuration table
CREATE TABLE public.pricing_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_type text NOT NULL UNIQUE,
  rate_per_km numeric NOT NULL DEFAULT 10,
  base_fare numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;

-- Anyone can view pricing
CREATE POLICY "Anyone can view pricing" 
ON public.pricing_config 
FOR SELECT 
USING (true);

-- Only admins can update pricing
CREATE POLICY "Admins can update pricing" 
ON public.pricing_config 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert pricing
CREATE POLICY "Admins can insert pricing" 
ON public.pricing_config 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_pricing_config_updated_at
BEFORE UPDATE ON public.pricing_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pricing for different vehicle types
INSERT INTO public.pricing_config (vehicle_type, rate_per_km, base_fare) VALUES
  ('auto', 10, 30),
  ('car', 12, 50),
  ('suv', 15, 70),
  ('outstation', 10, 100);

-- Add payment columns to bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS distance_km numeric;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS estimated_fare numeric;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS advance_amount numeric;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS razorpay_payment_id text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS razorpay_order_id text;