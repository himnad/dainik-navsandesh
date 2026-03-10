import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Newspaper, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // store login session
      localStorage.setItem("admin_user", JSON.stringify(user));

      toast({
        title: "लॉगिन सफल",
        description: "स्वागत है, संपादक!",
      });

      navigate("/admin/dashboard");

    } catch (error) {
      toast({
        title: "लॉगिन विफल",
        description: "गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-2 border-border">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 bg-foreground rounded-full flex items-center justify-center">
            <Newspaper className="text-primary-foreground" size={28} />
          </div>

          <CardTitle className="font-headline text-2xl">
            दैनिक नवसंदेश
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            पत्रकार पैनल — कृपया लॉगिन करें
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email">ईमेल</Label>

              <Input
                id="email"
                type="email"
                placeholder="yourname@navsandesh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "प्रवेश हो रहा है..." : "लॉगिन करें"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;