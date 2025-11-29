import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ onAddProduct, searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl shadow-glow">
              P
            </div>
            <h1 className="text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Produktet
            </h1>
          </div>
          
          <div className="flex-1 w-full md:max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Kërko produkte..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-card/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <Button onClick={onAddProduct} variant="accent" size="lg" className="gap-2 font-semibold h-12 px-6 rounded-xl shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            Posto Produkt
          </Button>
        </div>
      </div>
    </header>
  );
};
