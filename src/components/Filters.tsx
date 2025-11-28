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
  selectedCountry: string | null;
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

const locationsByCountry: { [key: string]: Array<{ value: string; label: string }> } = {
  al: [
    { value: "all", label: "Të gjitha" },
    { value: "tirane", label: "Tiranë" },
    { value: "durres", label: "Durrës" },
    { value: "vlore", label: "Vlorë" },
    { value: "shkoder", label: "Shkodër" },
    { value: "elbasan", label: "Elbasan" },
    { value: "korce", label: "Korçë" },
  ],
  xk: [
    { value: "all", label: "Të gjitha" },
    { value: "prishtine", label: "Prishtinë" },
    { value: "prizren", label: "Prizren" },
    { value: "peje", label: "Pejë" },
    { value: "gjakove", label: "Gjakovë" },
    { value: "gjilan", label: "Gjilan" },
    { value: "ferizaj", label: "Ferizaj" },
  ],
  mk: [
    { value: "all", label: "Të gjitha" },
    { value: "shkup", label: "Shkup" },
    { value: "tetove", label: "Tetovë" },
    { value: "gostivar", label: "Gostivar" },
    { value: "struge", label: "Strugë" },
    { value: "kumanova", label: "Kumanovë" },
  ],
  me: [
    { value: "all", label: "Të gjitha" },
    { value: "podgorice", label: "Podgoricë" },
    { value: "ulqin", label: "Ulqin" },
    { value: "tuzi", label: "Tuzi" },
    { value: "plava", label: "Plavë" },
    { value: "rozhaje", label: "Rozhajë" },
  ],
};

export const Filters = ({
  selectedCategory,
  selectedLocation,
  selectedCountry,
  onCategoryChange,
  onLocationChange,
  onReset,
}: FiltersProps) => {
  const locations = selectedCountry ? locationsByCountry[selectedCountry] : locationsByCountry.al;
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
