import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { Filters } from "@/components/Filters";
import heroImage from "@/assets/hero-image.jpg";
import { Sparkles } from "lucide-react";

// Mock data
const mockProducts = [
  {
    id: "1",
    title: "iPhone 14 Pro 256GB",
    price: 899,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500&q=80",
    location: "Tiranë",
    category: "Elektronikë",
    rating: 4.5,
    reviewCount: 12,
  },
  {
    id: "2",
    title: "Sofë moderne 3-vendësh",
    price: 450,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    location: "Durrës",
    category: "Mobilje",
    rating: 5,
    reviewCount: 8,
  },
  {
    id: "3",
    title: "MacBook Pro M2",
    price: 1899,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    location: "Tiranë",
    category: "Elektronikë",
    rating: 4.8,
    reviewCount: 15,
  },
  {
    id: "4",
    title: "Biçikletë Malesh",
    price: 380,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&q=80",
    location: "Vlorë",
    category: "Sport",
    rating: 4.2,
    reviewCount: 6,
  },
  {
    id: "5",
    title: "Kamera Canon EOS R6",
    price: 2100,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    location: "Shkodër",
    category: "Elektronikë",
    rating: 4.9,
    reviewCount: 20,
  },
  {
    id: "6",
    title: "Tavolinë druri natyral",
    price: 180,
    image: "https://images.unsplash.com/photo-1571898153097-63d0b2301f8c?w=500&q=80",
    location: "Elbasan",
    category: "Mobilje",
    rating: 4.3,
    reviewCount: 9,
  },
];

const Index = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || product.location.toLowerCase() === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
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
            alt="Marketplace hero"
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
            <div className="mb-6">
              <h3 className="text-2xl font-bold">
                {filteredProducts.length} produkte të gjetura
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => console.log("Product clicked:", product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Nuk u gjet asnjë produkt. Provo të ndryshosh filtrat.
                </p>
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
