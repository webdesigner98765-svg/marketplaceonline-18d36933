import { useState } from "react";
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

        {/* Country Section */}
        <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-button">
              <Globe className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Shteti</h2>
              <p className="text-muted-foreground text-sm">Zgjidh shtetin për të parë produkte</p>
            </div>
          </div>

          {currentCountry && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-2xl">{currentCountry.flag}</span>
              <span className="font-semibold">{currentCountry.name}</span>
              <span className="ml-auto text-xs text-primary font-medium px-3 py-1 rounded-full bg-primary/10">Aktiv</span>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Kërko shtetin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-0 rounded-xl"
            />
          </div>

          {/* Countries grid */}
          <div className="max-h-[50vh] overflow-y-auto pr-2 -mr-2">
            <div className="grid grid-cols-2 gap-2">
              {filteredCountries.map((country) => {
                const isSelected = savedCountry === country.code;
                return (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                    className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all group ${
                      isSelected
                        ? "bg-gradient-primary text-primary-foreground shadow-button"
                        : "hover:bg-secondary/80 text-foreground"
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className={`font-medium text-sm truncate ${isSelected ? "" : "group-hover:text-primary"} transition-colors`}>
                      {country.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
