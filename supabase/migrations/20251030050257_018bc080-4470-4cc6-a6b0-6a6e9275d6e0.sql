-- Allow anyone to insert into drivers table (no auth required)
DROP POLICY IF EXISTS "Anyone authenticated can register as driver" ON public.drivers;

CREATE POLICY "Anyone can register as driver"
ON public.drivers
FOR INSERT
WITH CHECK (true);

-- Add assigned_driver_id to bookings table to track driver assignments
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS assigned_driver_id uuid REFERENCES public.drivers(id) ON DELETE SET NULL;