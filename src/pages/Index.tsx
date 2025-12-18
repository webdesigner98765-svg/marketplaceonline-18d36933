import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { Filters } from "@/components/Filters";
import { CountrySelectModal } from "@/components/CountrySelectModal";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-interior.jpg";
import { Sparkles, Package, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const Index = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowCountryModal(false);
    localStorage.setItem("selectedCountry", country);
  };

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      setSelectedCountry(savedCountry);
      setShowCountryModal(false);
    }
  }, []);

  // No products initially - empty array
  const products: any[] = [];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCountryName = (code: string) => {
    const countryNames: { [key: string]: string } = {
      af: "Afganistan", al: "Shqipëri", dz: "Algjeri", ad: "Andorrë", ao: "Angolë",
      ar: "Argjentinë", am: "Armeni", au: "Australi", at: "Austri", az: "Azerbajxhan",
      bs: "Bahamas", bh: "Bahrain", bd: "Bangladesh", bb: "Barbados", by: "Bjellorusi",
      be: "Belgjikë", bz: "Belizë", bj: "Benin", bt: "Butan", bo: "Bolivi",
      ba: "Bosnjë e Hercegovinë", bw: "Botsvanë", br: "Brazil", bn: "Brunei", bg: "Bullgari",
      bf: "Burkina Faso", bi: "Burundi", cv: "Kabo Verde", kh: "Kamboxhia", cm: "Kamerun",
      ca: "Kanada", cf: "Republika e Afrikës Qendrore", td: "Çad", cl: "Kili", cn: "Kinë",
      co: "Kolumbi", km: "Komore", cg: "Kongo", cd: "Republika Demokratike e Kongos", cr: "Kosta Rikë",
      ci: "Bregu i Fildishtë", hr: "Kroaci", cu: "Kubë", cy: "Qipro", cz: "Republika Çeke",
      dk: "Danimarkë", dj: "Xhibuti", dm: "Dominikë", do: "Republika Dominikane", ec: "Ekuador",
      eg: "Egjipt", sv: "Salvador", gq: "Guineja Ekuatoriale", er: "Eritre", ee: "Estoni",
      sz: "Esuatini", et: "Etiopi", fj: "Fixhi", fi: "Finlandë", fr: "Francë",
      ga: "Gabon", gm: "Gambia", ge: "Gjeorgji", de: "Gjermani", gh: "Ganë",
      gr: "Greqi", gd: "Grenadë", gt: "Guatemalë", gn: "Guine", gw: "Guine-Bisau",
      gy: "Guajanë", ht: "Haiti", hn: "Honduras", hu: "Hungari", is: "Islandë",
      in: "Indi", id: "Indonezi", ir: "Iran", iq: "Irak", ie: "Irlandë",
      il: "Izrael", it: "Itali", jm: "Xhamajkë", jp: "Japoni", jo: "Jordani",
      kz: "Kazakistan", ke: "Kenia", ki: "Kiribati", kp: "Koreja e Veriut", kr: "Koreja e Jugut",
      xk: "Kosovë", kw: "Kuvajt", kg: "Kirgistan", la: "Laos", lv: "Letoni",
      lb: "Liban", ls: "Lesoto", lr: "Liberi", ly: "Libi", li: "Lihtenshtajn",
      lt: "Lituani", lu: "Luksemburg", mg: "Madagaskar", mw: "Malavi", my: "Malajzi",
      mv: "Maldive", ml: "Mali", mt: "Maltë", mh: "Ishujt Marshall", mr: "Mauritani",
      mu: "Mauritius", mx: "Meksikë", fm: "Mikronezia", md: "Moldavi", mc: "Monako",
      mn: "Mongoli", me: "Mali i Zi", ma: "Marok", mz: "Mozambik", mm: "Mianmar",
      na: "Namibi", nr: "Nauru", np: "Nepal", nl: "Holandë", nz: "Zelanda e Re",
      ni: "Nikaragua", ne: "Nigjer", ng: "Nigeri", mk: "Maqedoni e Veriut", no: "Norvegji",
      om: "Oman", pk: "Pakistan", pw: "Palau", ps: "Palestinë", pa: "Panama",
      pg: "Papua Guineja e Re", py: "Paraguaj", pe: "Peru", ph: "Filipine", pl: "Poloni",
      pt: "Portugali", qa: "Katar", ro: "Rumani", ru: "Rusi", rw: "Ruandë",
      kn: "Saint Kitts e Nevis", lc: "Shën Luçia", vc: "Shën Vincent e Grenadine", ws: "Samoa", sm: "San Marino",
      st: "São Tomé e Príncipe", sa: "Arabia Saudite", sn: "Senegal", rs: "Serbi", sc: "Sejshelle",
      sl: "Sierra Leone", sg: "Singapor", sk: "Sllovaki", si: "Slloveni", sb: "Ishujt Solomon",
      so: "Somali", za: "Afrika e Jugut", ss: "Sudani i Jugut", es: "Spanjë", lk: "Sri Lankë",
      sd: "Sudan", sr: "Surinam", se: "Suedi", ch: "Zvicër", sy: "Siri",
      tw: "Tajvan", tj: "Taxhikistan", tz: "Tanzani", th: "Tajlandë", tl: "Timor Lindor",
      tg: "Togo", to: "Tonga", tt: "Trinidad e Tobago", tn: "Tunizi", tr: "Turqi",
      tm: "Turkmenistan", tv: "Tuvalu", ug: "Ugandë", ua: "Ukrainë", ae: "Emiratet e Bashkuara Arabe",
      gb: "Mbretëria e Bashkuar", us: "Shtetet e Bashkuara", uy: "Uruguaj", uz: "Uzbekistan", vu: "Vanuatu",
      va: "Vatikan", ve: "Venezuelë", vn: "Vietnam", ye: "Jemen", zm: "Zambia", zw: "Zimbabve",
    };
    return countryNames[code] || code;
  };

  const features = [
    { icon: Zap, title: "Instant Posting", desc: "List your items in seconds" },
    { icon: Shield, title: "Secure Deals", desc: "Safe transactions guaranteed" },
    { icon: Globe, title: "Global Reach", desc: "Connect with buyers worldwide" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mesh gradient background */}
      <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none" />
      
      <CountrySelectModal open={showCountryModal} onSelectCountry={handleCountrySelect} />

      <Header
        onAddProduct={() => setShowAddModal(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Home interior"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">No registration required</span>
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Buy & Sell{" "}
              <span className="text-gradient">Anything</span>
              <br />Instantly
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              The fastest marketplace to list products and find great deals from real people.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Button 
                onClick={() => setShowAddModal(true)} 
                size="lg" 
                className="h-14 px-8 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl group"
              >
                Start Selling
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-base font-semibold glass rounded-2xl"
                onClick={() => setShowCountryModal(true)}
              >
                <Globe className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </div>

            {/* Country indicator */}
            {selectedCountry && (
              <div 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                <Package className="w-4 h-4" />
                <span>Showing products from <span className="font-medium text-foreground">{getCountryName(selectedCountry)}</span></span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28">
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onReset={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">
                  Discover Products
                </h2>
                <p className="text-muted-foreground mt-1">
                  {filteredProducts.length} products available
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCountryModal(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4 mr-2" />
                Change country
              </Button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 glass rounded-3xl">
                <div className="inline-flex p-8 rounded-3xl bg-gradient-primary/10 mb-8 animate-float">
                  <Package className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">No products yet</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
                  Be the first to post a product in {selectedCountry && getCountryName(selectedCountry)}!
                </p>
                <Button 
                  onClick={() => setShowAddModal(true)} 
                  size="lg" 
                  className="h-14 px-10 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl group"
                >
                  Post First Product
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.05 * i}s` }}
                  >
                    <ProductCard
                      {...product}
                      onClick={() => console.log("Product clicked:", product.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddProductModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default Index;