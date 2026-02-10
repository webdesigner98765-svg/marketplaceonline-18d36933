import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, LogOut, User, Sparkles } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-xl">Cilësimet</h1>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-10 max-w-2xl space-y-8">
        {/* Profile Section */}
        {user && (
          <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">Profili</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="w-full gap-2 h-12 rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
            >
              <LogOut className="w-5 h-5" />
              Dil nga llogaria
            </Button>
          </section>
        )}

      </main>
    </div>
  );
};

export default Settings;
