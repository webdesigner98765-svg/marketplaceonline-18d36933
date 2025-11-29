import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { Filters } from "@/components/Filters";
import { CountrySelectModal } from "@/components/CountrySelectModal";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-interior.jpg";
import { Sparkles, Package } from "lucide-react";

const Index = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

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
    const matchesLocation = selectedLocation === "all" || product.location.toLowerCase() === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getCountryName = (code: string) => {
    const countries: { [key: string]: string } = {
      al: "Shqipëri",
      xk: "Kosovë",
      mk: "Maqedoni e Veriut",
      me: "Mali i Zi",
    };
    return countries[code] || code;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <CountrySelectModal open={showCountryModal} onSelectCountry={handleCountrySelect} />

      <Header
        onAddProduct={() => setShowAddModal(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Home interior"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/85 to-background/60" />
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">Pa regjistrim, pa pritje</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-bold leading-tight tracking-tight">
              Reklamoni dhe Blini{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Produkte
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Mijëra produkte nga njerëz të vërtetë. Posto shpejt, bej pazare lehtë.
            </p>
            {selectedCountry && (
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border/50">
                <Package className="w-4 h-4" />
                <span>Produkte nga {getCountryName(selectedCountry)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <Filters
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              selectedCountry={selectedCountry}
              onCategoryChange={setSelectedCategory}
              onLocationChange={setSelectedLocation}
              onReset={() => {
                setSelectedCategory("all");
                setSelectedLocation("all");
                setSearchQuery("");
              }}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-display font-bold">
                {filteredProducts.length} produkte të gjetura
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCountryModal(true)}
                className="text-muted-foreground"
              >
                Ndrysho shtetin
              </Button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border/50 shadow-card">
                <div className="inline-flex p-6 rounded-full bg-primary/10 mb-6">
                  <Package className="w-16 h-16 text-primary" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-3">Nuk ka produkte akoma</h4>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Ji i pari që posto një produkt në {selectedCountry && getCountryName(selectedCountry)}!
                </p>
                <Button onClick={() => setShowAddModal(true)} variant="accent" size="lg" className="h-12 px-8 rounded-xl shadow-lg hover:shadow-xl">
                  Posto Produktin e Parë
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onClick={() => console.log("Product clicked:", product.id)}
                  />
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
