import { Search, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ onAddProduct, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">Marketplace</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={onAddProduct} 
            size="lg" 
            className="gap-2 font-semibold h-12 px-6 bg-gradient-primary hover:opacity-90 rounded-xl shadow-button hidden sm:flex"
          >
            <Plus className="w-5 h-5" />
            Post Product
          </Button>
          
          {/* Mobile CTA */}
          <Button 
            onClick={onAddProduct} 
            size="icon"
            className="w-12 h-12 bg-gradient-primary hover:opacity-90 rounded-xl shadow-button sm:hidden"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};