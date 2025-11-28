import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  "Elektronikë",
  "Veshje",
  "Mobilje",
  "Automjete",
  "Shtëpi & Kopësht",
  "Sport",
  "Libra",
  "Tjetër",
];

const locationsByCountry: { [key: string]: string[] } = {
  al: ["Tiranë", "Durrës", "Vlorë", "Shkodër", "Elbasan", "Korçë", "Fier", "Berat"],
  xk: ["Prishtinë", "Prizren", "Pejë", "Gjakovë", "Gjilan", "Ferizaj", "Mitrovicë"],
  mk: ["Shkup", "Tetovë", "Gostivar", "Strugë", "Kumanovë", "Dibër"],
  me: ["Podgoricë", "Ulqin", "Tuzi", "Plavë", "Rozhajë", "Bar"],
};

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry") || "al";
    setAvailableLocations(locationsByCountry[savedCountry] || locationsByCountry.al);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !price || !description || !category || !location) {
      toast.error("Ju lutemi plotësoni të gjitha fushat");
      return;
    }

    toast.success("Produkti u postua me sukses!");
    onClose();
    
    // Reset form
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Posto Produkt të Ri</DialogTitle>
          <DialogDescription>
            Plotëso të dhënat e produktit për ta publikuar menjëherë
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titulli i Produktit*</Label>
            <Input
              id="title"
              placeholder="p.sh. iPhone 14 Pro në gjendje të shkëlqyer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Çmimi (€)*</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategoria*</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Zgjidh kategorinë" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Vendndodhja*</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Zgjidh qytetin" />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Përshkrimi*</Label>
            <Textarea
              id="description"
              placeholder="Përshkruaj produktin tënd..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Foto e Produktit</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Kliko për të ngarkuar foto (opsionale)
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Anulo
            </Button>
            <Button type="submit" variant="accent" className="flex-1">
              Publiko Produktin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
