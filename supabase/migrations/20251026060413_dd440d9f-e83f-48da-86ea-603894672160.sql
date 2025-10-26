-- Create enum for driver verification status
CREATE TYPE public.driver_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for trip status
CREATE TYPE public.trip_status AS ENUM ('assigned', 'in_progress', 'completed', 'cancelled');

-- Create drivers table
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  region TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_number TEXT NOT NULL,
  license_number TEXT NOT NULL,
  photo_url TEXT,
  id_proof_url TEXT,
  status driver_status DEFAULT 'pending' NOT NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Create trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  pickup_lat DECIMAL(10, 8),
  pickup_lng DECIMAL(11, 8),
  drop_lat DECIMAL(10, 8),
  drop_lng DECIMAL(11, 8),
  current_lat DECIMAL(10, 8),
  current_lng DECIMAL(11, 8),
  status trip_status DEFAULT 'assigned' NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create driver notifications table
CREATE TABLE public.driver_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for drivers table
CREATE POLICY "Admins can view all drivers"
  ON public.drivers FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Drivers can view their own profile"
  ON public.drivers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone authenticated can register as driver"
  ON public.drivers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Drivers can update their own profile"
  ON public.drivers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any driver"
  ON public.drivers FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for trips table
CREATE POLICY "Admins can view all trips"
  ON public.trips FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Drivers can view their assigned trips"
  ON public.trips FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = trips.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update trips"
  ON public.trips FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Drivers can update their trip location"
  ON public.trips FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = trips.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

-- RLS Policies for driver_notifications table
CREATE POLICY "Drivers can view their own notifications"
  ON public.driver_notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = driver_notifications.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create notifications"
  ON public.driver_notifications FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Drivers can update their notifications"
  ON public.driver_notifications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.drivers
      WHERE drivers.id = driver_notifications.driver_id
      AND drivers.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_drivers_updated_at
  BEFORE UPDATE ON public.drivers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;
ALTER PUBLICATION supabase_realtime ADD TABLE public.driver_notifications;