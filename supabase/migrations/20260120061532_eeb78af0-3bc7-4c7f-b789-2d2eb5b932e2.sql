-- Package Seat Booking System Tables

-- 1. Package Routes (Admin creates routes like Sabalgarh -> Khatu Shyam)
CREATE TABLE public.package_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    stops TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Pickup Points (Admin manages pickup locations)
CREATE TABLE public.pickup_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Route Pickup Points (Many-to-Many relationship)
CREATE TABLE public.route_pickup_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES public.package_routes(id) ON DELETE CASCADE,
    pickup_point_id UUID NOT NULL REFERENCES public.pickup_points(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE(route_id, pickup_point_id)
);

-- 4. Vehicle Categories for Packages
CREATE TYPE public.package_vehicle_type AS ENUM ('sedan', 'premium_suv', 'tempo_traveller');

CREATE TABLE public.package_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_type package_vehicle_type NOT NULL,
    name TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    seat_layout JSONB NOT NULL DEFAULT '[]',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Packages (Admin creates packages with routes, vehicles, dates)
CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES public.package_routes(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES public.package_vehicles(id) ON DELETE CASCADE,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    return_date DATE,
    return_time TIME,
    base_price NUMERIC NOT NULL DEFAULT 0,
    window_seat_extra NUMERIC NOT NULL DEFAULT 0,
    middle_seat_discount NUMERIC NOT NULL DEFAULT 0,
    advance_percentage NUMERIC NOT NULL DEFAULT 100,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    tags TEXT[] DEFAULT '{}',
    facilities_included TEXT[] DEFAULT '{}',
    facilities_excluded TEXT[] DEFAULT '{}',
    is_women_only BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Seat Status Enum
CREATE TYPE public.seat_status AS ENUM ('available', 'booked', 'blocked', 'selected');
CREATE TYPE public.seat_type AS ENUM ('window', 'middle', 'aisle', 'driver');

-- 7. Package Seats (Individual seats for each package)
CREATE TABLE public.package_seats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    seat_number TEXT NOT NULL,
    seat_type seat_type NOT NULL DEFAULT 'middle',
    seat_row INTEGER NOT NULL,
    seat_col INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    status seat_status NOT NULL DEFAULT 'available',
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(package_id, seat_number)
);

-- 8. Package Bookings
CREATE TYPE public.package_booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE public.package_payment_status AS ENUM ('pending', 'partial', 'paid', 'refunded');

CREATE TABLE public.package_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id TEXT NOT NULL UNIQUE,
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    pickup_point_id UUID REFERENCES public.pickup_points(id),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    total_amount NUMERIC NOT NULL,
    advance_amount NUMERIC NOT NULL,
    paid_amount NUMERIC NOT NULL DEFAULT 0,
    booking_status package_booking_status NOT NULL DEFAULT 'pending',
    payment_status package_payment_status NOT NULL DEFAULT 'pending',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    is_women_booking BOOLEAN NOT NULL DEFAULT false,
    is_family_booking BOOLEAN NOT NULL DEFAULT false,
    loyalty_discount NUMERIC NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Booked Seats (Links bookings to specific seats)
CREATE TABLE public.package_booked_seats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.package_bookings(id) ON DELETE CASCADE,
    seat_id UUID NOT NULL REFERENCES public.package_seats(id) ON DELETE CASCADE,
    passenger_name TEXT,
    passenger_gender TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(booking_id, seat_id)
);

-- 10. Customer Loyalty Tracking
CREATE TABLE public.customer_loyalty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    total_bookings INTEGER NOT NULL DEFAULT 0,
    discount_percentage NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.package_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_pickup_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_booked_seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_loyalty ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- package_routes: Anyone can view active, Admins can manage
CREATE POLICY "Anyone can view active routes" ON public.package_routes FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage routes" ON public.package_routes FOR ALL USING (has_role(auth.uid(), 'admin'));

-- pickup_points: Anyone can view active, Admins can manage
CREATE POLICY "Anyone can view active pickup points" ON public.pickup_points FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage pickup points" ON public.pickup_points FOR ALL USING (has_role(auth.uid(), 'admin'));

-- route_pickup_points: Anyone can view, Admins can manage
CREATE POLICY "Anyone can view route pickup points" ON public.route_pickup_points FOR SELECT USING (true);
CREATE POLICY "Admins can manage route pickup points" ON public.route_pickup_points FOR ALL USING (has_role(auth.uid(), 'admin'));

-- package_vehicles: Anyone can view active, Admins can manage
CREATE POLICY "Anyone can view active vehicles" ON public.package_vehicles FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage vehicles" ON public.package_vehicles FOR ALL USING (has_role(auth.uid(), 'admin'));

-- packages: Anyone can view active, Admins can manage
CREATE POLICY "Anyone can view active packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage packages" ON public.packages FOR ALL USING (has_role(auth.uid(), 'admin'));

-- package_seats: Anyone can view, Admins can manage
CREATE POLICY "Anyone can view seats" ON public.package_seats FOR SELECT USING (true);
CREATE POLICY "Admins can manage seats" ON public.package_seats FOR ALL USING (has_role(auth.uid(), 'admin'));

-- package_bookings: Anyone can create, View own by phone, Admins can manage
CREATE POLICY "Anyone can create bookings" ON public.package_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all bookings" ON public.package_bookings FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bookings" ON public.package_bookings FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- package_booked_seats: Anyone can create, Admins can manage
CREATE POLICY "Anyone can create booked seats" ON public.package_booked_seats FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view booked seats" ON public.package_booked_seats FOR SELECT USING (true);
CREATE POLICY "Admins can manage booked seats" ON public.package_booked_seats FOR ALL USING (has_role(auth.uid(), 'admin'));

-- customer_loyalty: Anyone can view/update their own, Admins can manage
CREATE POLICY "Anyone can upsert loyalty" ON public.customer_loyalty FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view loyalty" ON public.customer_loyalty FOR SELECT USING (true);
CREATE POLICY "Admins can manage loyalty" ON public.customer_loyalty FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_package_routes_updated_at
    BEFORE UPDATE ON public.package_routes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
    BEFORE UPDATE ON public.packages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_package_bookings_updated_at
    BEFORE UPDATE ON public.package_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_loyalty_updated_at
    BEFORE UPDATE ON public.customer_loyalty
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update seat status when booked
CREATE OR REPLACE FUNCTION public.update_seat_on_booking()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.package_seats SET status = 'booked' WHERE id = NEW.seat_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_seat_booked
    AFTER INSERT ON public.package_booked_seats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_seat_on_booking();

-- Function to update available seats count
CREATE OR REPLACE FUNCTION public.update_available_seats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.packages 
    SET available_seats = (
        SELECT COUNT(*) FROM public.package_seats 
        WHERE package_id = NEW.package_id AND status = 'available'
    )
    WHERE id = NEW.package_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_seat_status_change
    AFTER UPDATE OF status ON public.package_seats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_available_seats();

-- Generate unique booking ID
CREATE OR REPLACE FUNCTION public.generate_booking_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_id := 'CB' || TO_CHAR(NOW(), 'YYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER generate_package_booking_id
    BEFORE INSERT ON public.package_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_booking_id();