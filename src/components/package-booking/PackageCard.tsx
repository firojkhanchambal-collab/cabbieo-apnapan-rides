import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Check, X } from "lucide-react";
import { format } from "date-fns";

interface Package {
  id: string;
  departure_date: string;
  departure_time: string;
  return_date: string | null;
  return_time: string | null;
  base_price: number;
  window_seat_extra: number;
  middle_seat_discount: number;
  advance_percentage: number;
  total_seats: number;
  available_seats: number;
  is_women_only: boolean;
  tags: string[] | null;
  facilities_included: string[] | null;
  facilities_excluded: string[] | null;
  package_routes: {
    name: string;
    stops: string[];
  };
  package_vehicles: {
    name: string;
    vehicle_type: "sedan" | "premium_suv" | "tempo_traveller";
    total_seats: number;
  };
}

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard = ({ pkg, onSelect }: PackageCardProps) => {
  const availabilityPercentage = (pkg.available_seats / pkg.total_seats) * 100;
  const isLowAvailability = availabilityPercentage <= 25;
  const isSoldOut = pkg.available_seats === 0;

  const tagColors: Record<string, string> = {
    "Festival Special": "bg-orange-100 text-orange-800 border-orange-200",
    "Weekend Special": "bg-purple-100 text-purple-800 border-purple-200",
    "Limited Seats": "bg-red-100 text-red-800 border-red-200",
  };

  const vehicleIcons: Record<string, string> = {
    sedan: "🚗",
    premium_suv: "🚘",
    tempo_traveller: "🚌",
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${isSoldOut ? 'opacity-60' : ''}`}>
      {/* Tags Banner */}
      {pkg.tags && pkg.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 p-2 bg-muted/50">
          {pkg.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className={tagColors[tag] || "bg-gray-100 text-gray-800"}
            >
              {tag}
            </Badge>
          ))}
          {pkg.is_women_only && (
            <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-200">
              👩 Women Only
            </Badge>
          )}
        </div>
      )}

      <CardContent className="p-4 space-y-4">
        {/* Route & Vehicle Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">
              {pkg.package_routes.name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              {vehicleIcons[pkg.package_vehicles.vehicle_type]} {pkg.package_vehicles.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">₹{pkg.base_price}</p>
            <p className="text-xs text-muted-foreground">per seat</p>
          </div>
        </div>

        {/* Route Stops */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <div className="flex items-center gap-1 flex-wrap">
            {pkg.package_routes.stops.map((stop, idx) => (
              <span key={idx} className="flex items-center">
                <span className="whitespace-nowrap">{stop}</span>
                {idx < pkg.package_routes.stops.length - 1 && (
                  <span className="mx-1 text-muted-foreground">→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">
                {format(new Date(pkg.departure_date), "dd MMM yyyy")}
              </p>
              <p className="text-xs text-muted-foreground">Departure</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="font-medium">{pkg.departure_time}</p>
              <p className="text-xs text-muted-foreground">Time</p>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Seats Available
            </span>
            <span className={`font-bold ${isLowAvailability ? 'text-destructive' : 'text-emerald-600'}`}>
              {pkg.available_seats} / {pkg.total_seats}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${isLowAvailability ? 'bg-destructive' : 'bg-emerald-500'}`}
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
          {isLowAvailability && !isSoldOut && (
            <p className="text-xs text-destructive font-medium animate-pulse">
              ⚡ Only {pkg.available_seats} seats left! Book now!
            </p>
          )}
        </div>

        {/* Facilities */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-emerald-700">✓ Included</p>
            {pkg.facilities_included?.slice(0, 3).map((facility, idx) => (
              <p key={idx} className="flex items-center gap-1 text-muted-foreground">
                <Check className="w-3 h-3 text-emerald-500" />
                {facility}
              </p>
            ))}
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-red-700">✗ Not Included</p>
            {pkg.facilities_excluded?.slice(0, 3).map((facility, idx) => (
              <p key={idx} className="flex items-center gap-1 text-muted-foreground">
                <X className="w-3 h-3 text-red-500" />
                {facility}
              </p>
            ))}
          </div>
        </div>

        {/* Pricing Info */}
        <div className="flex gap-2 text-xs">
          {pkg.window_seat_extra > 0 && (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              Window: +₹{pkg.window_seat_extra}
            </Badge>
          )}
          {pkg.middle_seat_discount > 0 && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700">
              Middle: -₹{pkg.middle_seat_discount}
            </Badge>
          )}
        </div>

        {/* Book Button */}
        <Button 
          className="w-full" 
          size="lg"
          disabled={isSoldOut}
          onClick={() => onSelect(pkg)}
        >
          {isSoldOut ? "Sold Out" : "Select Seats →"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
