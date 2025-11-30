import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

const categories = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "furniture", label: "Furniture" },
  { value: "vehicles", label: "Vehicles" },
  { value: "home", label: "Home & Garden" },
];


export const Filters = ({
  selectedCategory,
  onCategoryChange,
  onReset,
}: FiltersProps) => {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 shadow-card sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-xl">Filter</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="hover:bg-primary/10">
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
};
