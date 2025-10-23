-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  ride_type TEXT NOT NULL,
  booking_date DATE,
  booking_time TIME,
  phone TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Create policy to allow reading own bookings (future feature)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);