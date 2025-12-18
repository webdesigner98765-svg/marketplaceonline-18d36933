import { Button } from "@/components/ui/button";
import { RotateCcw, Grid3X3, Smartphone, Shirt, Home, Car, Palette, Music, Dumbbell, BookOpen, Sparkles } from "lucide-react";

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
}

const categories = [
  { id: "all", name: "All Categories", icon: Grid3X3 },
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "clothing", name: "Clothing", icon: Shirt },
  { id: "home", name: "Home & Garden", icon: Home },
  { id: "furniture", name: "Furniture", icon: Home },
  { id: "vehicles", name: "Vehicles", icon: Car },
  { id: "art", name: "Art & Crafts", icon: Palette },
  { id: "music", name: "Music", icon: Music },
  { id: "sports", name: "Sports", icon: Dumbbell },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "other", name: "Other", icon: Sparkles },
];

export const Filters = ({ selectedCategory, onCategoryChange, onReset }: FiltersProps) => {
  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground h-9 px-3"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground mb-3">Categories</p>
        <div className="space-y-1.5">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? "bg-gradient-primary text-primary-foreground shadow-button"
                    : "hover:bg-secondary/80 text-foreground"
                }`}
              >
                <category.icon className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};