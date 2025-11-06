-- Fix security issues with bookings and drivers tables

-- Drop the existing public view policy on bookings
DROP POLICY IF EXISTS "Anyone can view bookings" ON public.bookings;

-- Create new restricted policies for bookings
-- Only admins and assigned drivers can view bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Assigned drivers can view their bookings"
ON public.bookings
FOR SELECT
USING (
  assigned_driver_id IS NOT NULL 
  AND EXISTS (
    SELECT 1 FROM public.drivers
    WHERE drivers.id = bookings.assigned_driver_id
    AND drivers.user_id = auth.uid()
  )
);

-- Fix driver registration to require authentication
DROP POLICY IF EXISTS "Anyone can register as driver" ON public.drivers;

CREATE POLICY "Authenticated users can register as driver"
ON public.drivers
FOR INSERT
WITH CHECK (auth.uid() = user_id);