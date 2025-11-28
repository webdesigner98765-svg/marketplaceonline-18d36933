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
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Produktet
            </h1>
          </div>
          
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Kërko produkte..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          
          <Button onClick={onAddProduct} variant="accent" size="lg" className="gap-2 font-semibold">
            <Plus className="w-5 h-5" />
            Posto Produkt
          </Button>
        </div>
      </div>
    </header>
  );
};
