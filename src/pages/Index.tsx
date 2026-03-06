import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { AuthPromptModal } from "@/components/AuthPromptModal";
import { Filters } from "@/components/Filters";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-interior.jpg";
import { Sparkles, Package, ArrowRight, Zap, Shield, Globe } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";


const Index = () => {
  const { user } = useAuth();
  const { subscribed } = useSubscription();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [selectedCountry] = useState<string>("al");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products = [] } = useProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostProduct = () => {
    if (!user) {
      setShowAuthPrompt(true);
    } else if (!subscribed) {
      toast.info("You need an active subscription to post products");
      navigate("/pricing");
    } else {
      setShowAddModal(true);
    }
  };

  const features = [
    { icon: Zap, title: "Fast Listing", desc: "List items in seconds" },
    { icon: Shield, title: "Secure Transactions", desc: "Guaranteed purchases" },
    { icon: Globe, title: "Global Reach", desc: "Connect with buyers everywhere" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 mesh-gradient opacity-60 pointer-events-none" />
      
      <AuthPromptModal open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />

      <Header
        onAddProduct={handlePostProduct}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Home interior" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">No registration needed</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Buy & Sell{" "}
              <span className="text-gradient">Anything</span>
              <br />Instantly
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              The fastest marketplace to list products and find great deals.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={handlePostProduct} 
                size="lg" 
                className="h-14 px-8 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl group"
              >
                List Your Product
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={feature.title} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${0.1 * i}s` }}>
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
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-28">
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onReset={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold">Discover Products</h2>
                <p className="text-muted-foreground mt-1">{filteredProducts.length} products available</p>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 glass rounded-3xl">
                <div className="inline-flex p-8 rounded-3xl bg-gradient-primary/10 mb-8 animate-float">
                  <Package className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">No products yet</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
                  Be the first to list a product!
                </p>
                <Button 
                  onClick={handlePostProduct} 
                  size="lg" 
                  className="h-14 px-10 text-base font-semibold bg-gradient-primary hover:opacity-90 shadow-button rounded-2xl group"
                >
                  Post Your First Product
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${0.05 * i}s` }}>
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      image={product.image_url || "/placeholder.svg"}
                      location="Global"
                      category={product.category}
                      rating={0}
                      reviewCount={0}
                      userId={product.user_id}
                      onClick={() => console.log("Product clicked:", product.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddProductModal open={showAddModal} onClose={() => setShowAddModal(false)} country={selectedCountry} />
    </div>
  );
};

export default Index;
