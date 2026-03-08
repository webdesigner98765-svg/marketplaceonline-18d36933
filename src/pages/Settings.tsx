import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { ArrowLeft, LogOut, User, Sparkles, Moon, Sun, Globe, MapPin, Search, Check } from "lucide-react";
import { languages } from "@/i18n/translations";
import { countries } from "@/data/countries";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, preferredCountry, setPreferredCountry, t } = useLanguage();
  const [langSearch, setLangSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");

  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(langSearch.toLowerCase())
  );

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none" />

      <header className="sticky top-0 z-50 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-xl">{t("settings")}</h1>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-10 max-w-2xl space-y-8">
        {/* Profile */}
        {user && (
          <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
                <User className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">{t("profile")}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="w-full gap-2 h-12 rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
            >
              <LogOut className="w-5 h-5" />
              {t("sign_out")}
            </Button>
          </section>
        )}

        {/* Language */}
        <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Globe className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">{t("language")}</h2>
              <p className="text-muted-foreground text-sm">{t("select_language")}</p>
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("search_language")}
              value={langSearch}
              onChange={(e) => setLangSearch(e.target.value)}
              className="pl-11 h-11 bg-secondary/50 border-0 rounded-xl"
            />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  language === lang.code
                    ? "bg-gradient-primary text-primary-foreground shadow-button"
                    : "hover:bg-secondary/80 text-foreground"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium flex-1">{lang.name}</span>
                {language === lang.code && <Check className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </section>

        {/* Preferred Country */}
        <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">{t("preferred_country")}</h2>
              <p className="text-muted-foreground text-sm">{t("select_country")}</p>
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("search_country")}
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              className="pl-11 h-11 bg-secondary/50 border-0 rounded-xl"
            />
          </div>
          <div className="max-h-72 overflow-y-auto space-y-1">
            <button
              onClick={() => setPreferredCountry(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                !preferredCountry
                  ? "bg-gradient-primary text-primary-foreground shadow-button"
                  : "hover:bg-secondary/80 text-foreground"
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium flex-1">{t("all_countries")}</span>
              {!preferredCountry && <Check className="w-5 h-5" />}
            </button>
            {filteredCountries.map((c) => (
              <button
                key={c.code}
                onClick={() => setPreferredCountry(c.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  preferredCountry === c.code
                    ? "bg-gradient-primary text-primary-foreground shadow-button"
                    : "hover:bg-secondary/80 text-foreground"
                }`}
              >
                <span className="text-xl">{c.flag}</span>
                <span className="font-medium flex-1">{c.name}</span>
                {preferredCountry === c.code && <Check className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="glass rounded-3xl p-8 space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Moon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">{t("appearance")}</h2>
              <p className="text-muted-foreground text-sm">{t("customize_look")}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <p className="font-medium">{t("dark_mode")}</p>
                <p className="text-sm text-muted-foreground">
                  {theme === "dark" ? t("using_dark") : t("using_light")}
                </p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
