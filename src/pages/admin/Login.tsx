import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // Signup flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/dashboard`,
          },
        });

        if (error) throw error;

        if (data.user) {
          // Automatically assign admin role to first user
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({
              user_id: data.user.id,
              role: "admin",
            });

          if (roleError) {
            console.error("Role assignment error:", roleError);
          }

          toast.success("✅ Admin account बन गया! अब login करें।");
          setIsSignup(false);
        }
      } else {
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Check if user is admin
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .eq("role", "admin")
            .single();

          if (roleError || !roleData) {
            await supabase.auth.signOut();
            toast.error("आप admin नहीं हैं। Access denied.");
            return;
          }

          toast.success("स्वागत है Admin! 🎉");
          navigate("/admin/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message || (isSignup ? "Signup में समस्या हुई" : "Login में समस्या हुई"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignup ? "Admin Signup" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "पहला Admin account बनाएं"
              : "CABBIEO Admin Panel में लॉगिन करें"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@cabbieo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isSignup
                  ? "Account बन रहा है..."
                  : "Login हो रहा है..."
                : isSignup
                ? "Admin Account बनाएं"
                : "Login करें"}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-primary hover:underline"
              >
                {isSignup
                  ? "पहले से account है? Login करें"
                  : "पहला Admin? Signup करें"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
