import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Trash2, Edit2, Car, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SeatLayout {
  row: number;
  col: number;
  seatNumber: string;
  seatType: "window" | "middle" | "aisle" | "driver";
}

interface PackageVehicle {
  id: string;
  vehicle_type: "sedan" | "premium_suv" | "tempo_traveller";
  name: string;
  total_seats: number;
  seat_layout: SeatLayout[];
  description: string | null;
  is_active: boolean;
}

const vehicleTypeLabels = {
  sedan: "🚗 Sedan (5 Seater)",
  premium_suv: "🚘 Premium SUV (5 Seater)",
  tempo_traveller: "🚌 Tempo Traveller (17 Seater)",
};

const defaultLayouts: Record<string, SeatLayout[]> = {
  sedan: [
    { row: 0, col: 0, seatNumber: "D", seatType: "driver" },
    { row: 0, col: 1, seatNumber: "1", seatType: "window" },
    { row: 1, col: 0, seatNumber: "2", seatType: "window" },
    { row: 1, col: 1, seatNumber: "3", seatType: "middle" },
    { row: 1, col: 2, seatNumber: "4", seatType: "window" },
  ],
  premium_suv: [
    { row: 0, col: 0, seatNumber: "D", seatType: "driver" },
    { row: 0, col: 1, seatNumber: "1", seatType: "window" },
    { row: 1, col: 0, seatNumber: "2", seatType: "window" },
    { row: 1, col: 1, seatNumber: "3", seatType: "middle" },
    { row: 1, col: 2, seatNumber: "4", seatType: "window" },
  ],
  tempo_traveller: [
    { row: 0, col: 0, seatNumber: "D", seatType: "driver" },
    { row: 1, col: 0, seatNumber: "1", seatType: "window" },
    { row: 1, col: 1, seatNumber: "2", seatType: "aisle" },
    { row: 1, col: 2, seatNumber: "3", seatType: "aisle" },
    { row: 1, col: 3, seatNumber: "4", seatType: "window" },
    { row: 2, col: 0, seatNumber: "5", seatType: "window" },
    { row: 2, col: 1, seatNumber: "6", seatType: "aisle" },
    { row: 2, col: 2, seatNumber: "7", seatType: "aisle" },
    { row: 2, col: 3, seatNumber: "8", seatType: "window" },
    { row: 3, col: 0, seatNumber: "9", seatType: "window" },
    { row: 3, col: 1, seatNumber: "10", seatType: "aisle" },
    { row: 3, col: 2, seatNumber: "11", seatType: "aisle" },
    { row: 3, col: 3, seatNumber: "12", seatType: "window" },
    { row: 4, col: 0, seatNumber: "13", seatType: "window" },
    { row: 4, col: 1, seatNumber: "14", seatType: "aisle" },
    { row: 4, col: 2, seatNumber: "15", seatType: "aisle" },
    { row: 4, col: 3, seatNumber: "16", seatType: "window" },
  ],
};

export const PackageVehiclesSection = () => {
  const [vehicles, setVehicles] = useState<PackageVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<PackageVehicle | null>(null);
  const [formData, setFormData] = useState({
    vehicle_type: "" as "sedan" | "premium_suv" | "tempo_traveller" | "",
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("package_vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVehicles((data as unknown as PackageVehicle[]) || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.vehicle_type || !formData.name.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const layout = defaultLayouts[formData.vehicle_type] || [];
      const passengerSeats = layout.filter(s => s.seatType !== "driver").length;

      const vehicleData = {
        vehicle_type: formData.vehicle_type,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        total_seats: passengerSeats,
        seat_layout: layout as unknown as any,
      };

      if (editingVehicle) {
        const { error } = await supabase
          .from("package_vehicles")
          .update(vehicleData)
          .eq("id", editingVehicle.id);
        if (error) throw error;
        toast.success("Vehicle updated!");
      } else {
        const { error } = await supabase
          .from("package_vehicles")
          .insert(vehicleData);
        if (error) throw error;
        toast.success("Vehicle created!");
      }

      setDialogOpen(false);
      setEditingVehicle(null);
      setFormData({ vehicle_type: "", name: "", description: "" });
      fetchVehicles();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Failed to save vehicle");
    }
  };

  const toggleStatus = async (vehicle: PackageVehicle) => {
    try {
      const { error } = await supabase
        .from("package_vehicles")
        .update({ is_active: !vehicle.is_active })
        .eq("id", vehicle.id);
      
      if (error) throw error;
      toast.success(`Vehicle ${vehicle.is_active ? "disabled" : "enabled"}`);
      fetchVehicles();
    } catch (error) {
      console.error("Error toggling vehicle:", error);
      toast.error("Failed to update vehicle");
    }
  };

  const deleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    
    try {
      const { error } = await supabase
        .from("package_vehicles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Vehicle deleted!");
      fetchVehicles();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Failed to delete vehicle");
    }
  };

  const openEditDialog = (vehicle: PackageVehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicle_type: vehicle.vehicle_type,
      name: vehicle.name,
      description: vehicle.description || "",
    });
    setDialogOpen(true);
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
          <h2 className="text-2xl font-bold text-foreground">Package Vehicles</h2>
          <p className="text-muted-foreground">Manage vehicle types for package trips</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingVehicle(null);
            setFormData({ vehicle_type: "", name: "", description: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Vehicle Type *</Label>
                <Select
                  value={formData.vehicle_type}
                  onValueChange={(value: "sedan" | "premium_suv" | "tempo_traveller") =>
                    setFormData({ ...formData, vehicle_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">🚗 Sedan (5 Seater)</SelectItem>
                    <SelectItem value="premium_suv">🚘 Premium SUV (5 Seater)</SelectItem>
                    <SelectItem value="tempo_traveller">🚌 Tempo Traveller (17 Seater)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vehicle Name *</Label>
                <Input
                  placeholder="e.g., XUV Mahindra 300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Input
                  placeholder="Additional details about the vehicle"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              {formData.vehicle_type && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Seat Layout Preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {defaultLayouts[formData.vehicle_type]?.map((seat, i) => (
                      <Badge 
                        key={i} 
                        variant={seat.seatType === "driver" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {seat.seatNumber} - {seat.seatType}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={handleSubmit} className="w-full">
                {editingVehicle ? "Update" : "Add"} Vehicle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {vehicles.length === 0 ? (
        <Card className="p-12 text-center">
          <Car className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No vehicles created yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add vehicles for package bookings</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className={!vehicle.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {vehicleTypeLabels[vehicle.vehicle_type]}
                    </Badge>
                    <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                    {vehicle.description && (
                      <p className="text-sm text-muted-foreground mt-1">{vehicle.description}</p>
                    )}
                  </div>
                  <Badge variant={vehicle.is_active ? "default" : "secondary"}>
                    {vehicle.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {vehicle.total_seats} Passenger Seats
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vehicle.is_active}
                      onCheckedChange={() => toggleStatus(vehicle)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(vehicle)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteVehicle(vehicle.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageVehiclesSection;
