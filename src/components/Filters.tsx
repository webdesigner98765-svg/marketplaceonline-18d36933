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
  { value: "all", label: "Të gjitha" },
  { value: "elektronike", label: "Elektronikë" },
  { value: "veshje", label: "Veshje" },
  { value: "mobilje", label: "Mobilje" },
  { value: "automjete", label: "Automjete" },
  { value: "shtëpi", label: "Shtëpi & Kopësht" },
];


export const Filters = ({
  selectedCategory,
  onCategoryChange,
  onReset,
}: FiltersProps) => {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 shadow-card sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-xl">Filtro</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="hover:bg-primary/10">
          Pastro
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80">Kategoria</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Zgjidh kategorinë" />
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
