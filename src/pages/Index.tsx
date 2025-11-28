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
      <section className="relative h-[400px] overflow-hidden mb-8">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Home interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Pa regjistrim, pa pritje</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Reklamoni dhe Blini{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Produkte
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Mijëra produkte nga njerëz të vërtetë. Posto shpejt, bej pazare lehtë.
            </p>
            {selectedCountry && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />
                <span>Produkte nga {getCountryName(selectedCountry)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <Filters
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
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
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
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
              <div className="text-center py-20 bg-card rounded-xl border border-border">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-xl font-semibold mb-2">Nuk ka produkte akoma</h4>
                <p className="text-muted-foreground mb-6">
                  Ji i pari që posto një produkt në {selectedCountry && getCountryName(selectedCountry)}!
                </p>
                <Button onClick={() => setShowAddModal(true)} variant="accent" size="lg">
                  Posto Produktin e Parë
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
