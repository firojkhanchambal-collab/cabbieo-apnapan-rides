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
import { Plus, Trash2, Edit2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PickupPoint {
  id: string;
  name: string;
  address: string | null;
  is_active: boolean;
  created_at: string;
}

export const PickupPointsSection = () => {
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<PickupPoint | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    fetchPickupPoints();
  }, []);

  const fetchPickupPoints = async () => {
    try {
      const { data, error } = await supabase
        .from("pickup_points")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setPickupPoints(data || []);
    } catch (error) {
      console.error("Error fetching pickup points:", error);
      toast.error("Failed to load pickup points");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter pickup point name");
      return;
    }

    try {
      const pointData = {
        name: formData.name.trim(),
        address: formData.address.trim() || null,
      };

      if (editingPoint) {
        const { error } = await supabase
          .from("pickup_points")
          .update(pointData)
          .eq("id", editingPoint.id);
        if (error) throw error;
        toast.success("Pickup point updated!");
      } else {
        const { error } = await supabase
          .from("pickup_points")
          .insert(pointData);
        if (error) throw error;
        toast.success("Pickup point created!");
      }

      setDialogOpen(false);
      setEditingPoint(null);
      setFormData({ name: "", address: "" });
      fetchPickupPoints();
    } catch (error) {
      console.error("Error saving pickup point:", error);
      toast.error("Failed to save pickup point");
    }
  };

  const toggleStatus = async (point: PickupPoint) => {
    try {
      const { error } = await supabase
        .from("pickup_points")
        .update({ is_active: !point.is_active })
        .eq("id", point.id);
      
      if (error) throw error;
      toast.success(`Pickup point ${point.is_active ? "disabled" : "enabled"}`);
      fetchPickupPoints();
    } catch (error) {
      console.error("Error toggling pickup point:", error);
      toast.error("Failed to update pickup point");
    }
  };

  const deletePoint = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pickup point?")) return;
    
    try {
      const { error } = await supabase
        .from("pickup_points")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Pickup point deleted!");
      fetchPickupPoints();
    } catch (error) {
      console.error("Error deleting pickup point:", error);
      toast.error("Failed to delete pickup point");
    }
  };

  const openEditDialog = (point: PickupPoint) => {
    setEditingPoint(point);
    setFormData({
      name: point.name,
      address: point.address || "",
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
          <h2 className="text-2xl font-bold text-foreground">Pickup Points</h2>
          <p className="text-muted-foreground">Manage pickup locations for packages</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingPoint(null);
            setFormData({ name: "", address: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Pickup Point
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPoint ? "Edit Pickup Point" : "Add Pickup Point"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  placeholder="e.g., Sabalgarh Bus Stand"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Address (optional)</Label>
                <Input
                  placeholder="Full address for reference"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingPoint ? "Update" : "Add"} Pickup Point
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {pickupPoints.length === 0 ? (
        <Card className="p-12 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No pickup points created yet</p>
          <p className="text-sm text-muted-foreground mt-1">Click "Add Pickup Point" to get started</p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {pickupPoints.map((point) => (
            <Card key={point.id} className={!point.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{point.name}</CardTitle>
                      {point.address && (
                        <p className="text-xs text-muted-foreground">{point.address}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant={point.is_active ? "default" : "secondary"} className="text-xs">
                    {point.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-end gap-2">
                  <Switch
                    checked={point.is_active}
                    onCheckedChange={() => toggleStatus(point)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(point)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deletePoint(point.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupPointsSection;
