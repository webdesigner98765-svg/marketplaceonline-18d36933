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
  selectedLocation: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
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

const locations = [
  { value: "all", label: "Të gjitha" },
  { value: "tirane", label: "Tiranë" },
  { value: "durres", label: "Durrës" },
  { value: "vlore", label: "Vlorë" },
  { value: "shkoder", label: "Shkodër" },
];

export const Filters = ({
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
  onReset,
}: FiltersProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filtro</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Pastro
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Kategoria</label>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Vendndodhja</label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Zgjidh vendndodhjen" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
