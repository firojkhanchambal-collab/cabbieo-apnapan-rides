import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit2, Package, Calendar, Users, IndianRupee, Tag } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PackageRoute {
  id: string;
  name: string;
  stops: string[];
}

interface PackageVehicle {
  id: string;
  name: string;
  vehicle_type: string;
  total_seats: number;
  seat_layout: any[];
}

interface PackageData {
  id: string;
  route_id: string;
  vehicle_id: string;
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
  tags: string[];
  facilities_included: string[];
  facilities_excluded: string[];
  is_women_only: boolean;
  is_active: boolean;
  created_at: string;
  package_routes?: PackageRoute;
  package_vehicles?: PackageVehicle;
}

const tagOptions = ["🎉 Festival Special", "🗓 Weekend Special", "🔥 Limited Seats", "⭐ Premium"];
const facilitiesIncluded = ["Water Bottle (Going)", "Tea & Snacks (Going)", "Water Bottle (Return)", "Tea & Snacks (Return)"];
const facilitiesExcluded = ["Food / Meals", "Hotel / Stay", "Darshan Charges", "Personal Expenses"];

export const PackagesSection = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [routes, setRoutes] = useState<PackageRoute[]>([]);
  const [vehicles, setVehicles] = useState<PackageVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [formData, setFormData] = useState({
    route_id: "",
    vehicle_id: "",
    departure_date: "",
    departure_time: "",
    return_date: "",
    return_time: "",
    base_price: "",
    window_seat_extra: "",
    middle_seat_discount: "",
    advance_percentage: "100",
    tags: [] as string[],
    facilities_included: [] as string[],
    facilities_excluded: [] as string[],
    is_women_only: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [packagesRes, routesRes, vehiclesRes] = await Promise.all([
        supabase
          .from("packages")
          .select("*, package_routes(*), package_vehicles(*)")
          .order("departure_date", { ascending: true }),
        supabase.from("package_routes").select("*").eq("is_active", true),
        supabase.from("package_vehicles").select("*").eq("is_active", true),
      ]);

      if (packagesRes.error) throw packagesRes.error;
      if (routesRes.error) throw routesRes.error;
      if (vehiclesRes.error) throw vehiclesRes.error;

      setPackages((packagesRes.data as PackageData[]) || []);
      setRoutes(routesRes.data || []);
      setVehicles((vehiclesRes.data as PackageVehicle[]) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.route_id || !formData.vehicle_id || !formData.departure_date || !formData.departure_time || !formData.base_price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const vehicle = vehicles.find(v => v.id === formData.vehicle_id);
      const totalSeats = vehicle?.total_seats || 0;

      const packageData = {
        route_id: formData.route_id,
        vehicle_id: formData.vehicle_id,
        departure_date: formData.departure_date,
        departure_time: formData.departure_time,
        return_date: formData.return_date || null,
        return_time: formData.return_time || null,
        base_price: parseFloat(formData.base_price),
        window_seat_extra: parseFloat(formData.window_seat_extra) || 0,
        middle_seat_discount: parseFloat(formData.middle_seat_discount) || 0,
        advance_percentage: parseFloat(formData.advance_percentage) || 100,
        total_seats: totalSeats,
        available_seats: totalSeats,
        tags: formData.tags,
        facilities_included: formData.facilities_included,
        facilities_excluded: formData.facilities_excluded,
        is_women_only: formData.is_women_only,
      };

      if (editingPackage) {
        const { error } = await supabase
          .from("packages")
          .update(packageData)
          .eq("id", editingPackage.id);
        if (error) throw error;
        toast.success("Package updated!");
      } else {
        // Create package and seats
        const { data: newPackage, error: packageError } = await supabase
          .from("packages")
          .insert(packageData)
          .select()
          .single();
        
        if (packageError) throw packageError;

        // Create seats based on vehicle layout
        if (vehicle?.seat_layout) {
          const seats = vehicle.seat_layout
            .filter((s: any) => s.seatType !== "driver")
            .map((s: any) => ({
              package_id: newPackage.id,
              seat_number: s.seatNumber as string,
              seat_type: s.seatType as "window" | "middle" | "aisle" | "driver",
              seat_row: s.row as number,
              seat_col: s.col as number,
              price: s.seatType === "window" 
                ? parseFloat(formData.base_price) + (parseFloat(formData.window_seat_extra) || 0)
                : parseFloat(formData.base_price) - (parseFloat(formData.middle_seat_discount) || 0),
              status: "available" as const,
            }));

          const { error: seatsError } = await supabase
            .from("package_seats")
            .insert(seats);
          
          if (seatsError) throw seatsError;
        }

        toast.success("Package created with seats!");
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving package:", error);
      toast.error("Failed to save package");
    }
  };

  const resetForm = () => {
    setEditingPackage(null);
    setFormData({
      route_id: "",
      vehicle_id: "",
      departure_date: "",
      departure_time: "",
      return_date: "",
      return_time: "",
      base_price: "",
      window_seat_extra: "",
      middle_seat_discount: "",
      advance_percentage: "100",
      tags: [],
      facilities_included: [],
      facilities_excluded: [],
      is_women_only: false,
    });
  };

  const toggleStatus = async (pkg: PackageData) => {
    try {
      const { error } = await supabase
        .from("packages")
        .update({ is_active: !pkg.is_active })
        .eq("id", pkg.id);
      
      if (error) throw error;
      toast.success(`Package ${pkg.is_active ? "disabled" : "enabled"}`);
      fetchData();
    } catch (error) {
      console.error("Error toggling package:", error);
      toast.error("Failed to update package");
    }
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package? This will also delete all associated seats and bookings.")) return;
    
    try {
      const { error } = await supabase
        .from("packages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Package deleted!");
      fetchData();
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    }
  };

  const openEditDialog = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormData({
      route_id: pkg.route_id,
      vehicle_id: pkg.vehicle_id,
      departure_date: pkg.departure_date,
      departure_time: pkg.departure_time,
      return_date: pkg.return_date || "",
      return_time: pkg.return_time || "",
      base_price: pkg.base_price.toString(),
      window_seat_extra: pkg.window_seat_extra.toString(),
      middle_seat_discount: pkg.middle_seat_discount.toString(),
      advance_percentage: pkg.advance_percentage.toString(),
      tags: pkg.tags || [],
      facilities_included: pkg.facilities_included || [],
      facilities_excluded: pkg.facilities_excluded || [],
      is_women_only: pkg.is_women_only,
    });
    setDialogOpen(true);
  };

  const toggleArrayItem = (array: string[], item: string, setter: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Packages</h2>
          <p className="text-muted-foreground">Create and manage travel packages</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? "Edit Package" : "Create New Package"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Route & Vehicle Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Route *</Label>
                  <Select value={formData.route_id} onValueChange={(v) => setFormData({ ...formData, route_id: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle *</Label>
                  <Select value={formData.vehicle_id} onValueChange={(v) => setFormData({ ...formData, vehicle_id: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.total_seats} seats)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Departure & Return */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Departure Date *</Label>
                  <Input type="date" value={formData.departure_date} onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Departure Time *</Label>
                  <Input type="time" value={formData.departure_time} onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Return Date</Label>
                  <Input type="date" value={formData.return_date} onChange={(e) => setFormData({ ...formData, return_date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Return Time</Label>
                  <Input type="time" value={formData.return_time} onChange={(e) => setFormData({ ...formData, return_time: e.target.value })} />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Base Price (₹) *</Label>
                  <Input type="number" placeholder="1400" value={formData.base_price} onChange={(e) => setFormData({ ...formData, base_price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Window Seat Extra (₹)</Label>
                  <Input type="number" placeholder="100" value={formData.window_seat_extra} onChange={(e) => setFormData({ ...formData, window_seat_extra: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Middle Seat Discount (₹)</Label>
                  <Input type="number" placeholder="100" value={formData.middle_seat_discount} onChange={(e) => setFormData({ ...formData, middle_seat_discount: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Advance Payment (%)</Label>
                  <Input type="number" placeholder="100" value={formData.advance_percentage} onChange={(e) => setFormData({ ...formData, advance_percentage: e.target.value })} />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <Badge
                      key={tag}
                      variant={formData.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(formData.tags, tag, (arr) => setFormData({ ...formData, tags: arr }))}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-green-600">✔ Included</Label>
                  <div className="space-y-2">
                    {facilitiesIncluded.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.facilities_included.includes(f)}
                          onCheckedChange={() => toggleArrayItem(formData.facilities_included, f, (arr) => setFormData({ ...formData, facilities_included: arr }))}
                        />
                        <span className="text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-destructive">❌ Not Included</Label>
                  <div className="space-y-2">
                    {facilitiesExcluded.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.facilities_excluded.includes(f)}
                          onCheckedChange={() => toggleArrayItem(formData.facilities_excluded, f, (arr) => setFormData({ ...formData, facilities_excluded: arr }))}
                        />
                        <span className="text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Women Only */}
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.is_women_only}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_women_only: checked })}
                />
                <Label>Women Only Trip</Label>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                {editingPackage ? "Update Package" : "Create Package"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {packages.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No packages created yet</p>
          <p className="text-sm text-muted-foreground mt-1">Create routes and vehicles first, then add packages</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={!pkg.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <CardTitle className="text-lg">{pkg.package_routes?.name}</CardTitle>
                      {pkg.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                      {pkg.is_women_only && (
                        <Badge variant="outline" className="text-pink-600 border-pink-300">👩 Women Only</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(pkg.departure_date), "dd MMM yyyy")} at {pkg.departure_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {pkg.available_seats}/{pkg.total_seats} seats
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        ₹{pkg.base_price} (base)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={pkg.is_active ? "default" : "secondary"}>
                      {pkg.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Switch checked={pkg.is_active} onCheckedChange={() => toggleStatus(pkg)} />
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(pkg)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePackage(pkg.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">{pkg.package_vehicles?.name}</Badge>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">
                    Window: +₹{pkg.window_seat_extra} | Middle: -₹{pkg.middle_seat_discount}
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Advance: {pkg.advance_percentage}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagesSection;
