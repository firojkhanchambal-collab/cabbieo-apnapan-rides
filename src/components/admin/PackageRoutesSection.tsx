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
import { Plus, Trash2, Edit2, MapPin, Route, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PackageRoute {
  id: string;
  name: string;
  description: string | null;
  stops: string[];
  is_active: boolean;
  created_at: string;
}

export const PackageRoutesSection = () => {
  const [routes, setRoutes] = useState<PackageRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<PackageRoute | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stops: [""],
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from("package_routes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRoutes(data || []);
    } catch (error) {
      console.error("Error fetching routes:", error);
      toast.error("Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.stops.filter(s => s.trim()).length < 2) {
      toast.error("Please enter route name and at least 2 stops");
      return;
    }

    try {
      const routeData = {
        name: formData.name,
        description: formData.description || null,
        stops: formData.stops.filter(s => s.trim()),
      };

      if (editingRoute) {
        const { error } = await supabase
          .from("package_routes")
          .update(routeData)
          .eq("id", editingRoute.id);
        if (error) throw error;
        toast.success("Route updated successfully!");
      } else {
        const { error } = await supabase
          .from("package_routes")
          .insert(routeData);
        if (error) throw error;
        toast.success("Route created successfully!");
      }

      setDialogOpen(false);
      setEditingRoute(null);
      setFormData({ name: "", description: "", stops: [""] });
      fetchRoutes();
    } catch (error) {
      console.error("Error saving route:", error);
      toast.error("Failed to save route");
    }
  };

  const toggleRouteStatus = async (route: PackageRoute) => {
    try {
      const { error } = await supabase
        .from("package_routes")
        .update({ is_active: !route.is_active })
        .eq("id", route.id);
      
      if (error) throw error;
      toast.success(`Route ${route.is_active ? "disabled" : "enabled"}`);
      fetchRoutes();
    } catch (error) {
      console.error("Error toggling route:", error);
      toast.error("Failed to update route");
    }
  };

  const deleteRoute = async (id: string) => {
    if (!confirm("Are you sure you want to delete this route?")) return;
    
    try {
      const { error } = await supabase
        .from("package_routes")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Route deleted!");
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error);
      toast.error("Failed to delete route");
    }
  };

  const openEditDialog = (route: PackageRoute) => {
    setEditingRoute(route);
    setFormData({
      name: route.name,
      description: route.description || "",
      stops: route.stops.length > 0 ? route.stops : [""],
    });
    setDialogOpen(true);
  };

  const addStop = () => {
    setFormData(prev => ({ ...prev, stops: [...prev.stops, ""] }));
  };

  const removeStop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  const updateStop = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.map((s, i) => (i === index ? value : s)),
    }));
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
          <h2 className="text-2xl font-bold text-foreground">Package Routes</h2>
          <p className="text-muted-foreground">Manage travel routes for package bookings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingRoute(null);
            setFormData({ name: "", description: "", stops: [""] });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRoute ? "Edit Route" : "Create New Route"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Route Name *</Label>
                <Input
                  placeholder="e.g., Chambal Express - Khatu Shyam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Short description of the route"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  Route Stops (in order)
                </Label>
                {formData.stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="w-6 text-sm text-muted-foreground">{index + 1}.</span>
                    <Input
                      placeholder={`Stop ${index + 1} (e.g., Sabalgarh)`}
                      value={stop}
                      onChange={(e) => updateStop(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.stops.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStop(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addStop} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stop
                </Button>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingRoute ? "Update Route" : "Create Route"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {routes.length === 0 ? (
        <Card className="p-12 text-center">
          <Route className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No routes created yet</p>
          <p className="text-sm text-muted-foreground mt-1">Click "Add Route" to create your first package route</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {routes.map((route) => (
            <Card key={route.id} className={!route.is_active ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <Badge variant={route.is_active ? "default" : "secondary"}>
                        {route.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {route.description && (
                      <p className="text-sm text-muted-foreground mt-1">{route.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={route.is_active}
                      onCheckedChange={() => toggleRouteStatus(route)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(route)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteRoute(route.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center">
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {stop}
                      </Badge>
                      {index < route.stops.length - 1 && (
                        <span className="mx-2 text-muted-foreground">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageRoutesSection;
