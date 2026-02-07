import { useState } from "react";
import { Upload } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  country: string | null;
}

const categories = [
  "Electronics",
  "Clothing",
  "Furniture",
  "Vehicles",
  "Home & Garden",
  "Sports",
  "Books",
  "Other",
];

export const AddProductModal = ({ open, onClose, country }: AddProductModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !price || !description || !category) {
      toast.error("Plotëso të gjitha fushat");
      return;
    }

    if (!user) {
      toast.error("Duhet të hysh për të postuar");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("products").insert({
        title,
        price: parseFloat(price),
        description,
        category: category.toLowerCase(),
        country: country || undefined,
        user_id: user.id,
      });

      if (error) throw error;

      toast.success("Produkti u postua me sukses!");
      onClose();
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error("Error posting product:", err);
      toast.error("Ndodhi një gabim. Provo përsëri.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Posto Produkt të Ri</DialogTitle>
          <DialogDescription>
            Plotëso detajet e produktit për ta publikuar menjëherë
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
            <Button type="submit" variant="accent" className="flex-1" disabled={submitting}>
              {submitting ? "Duke postuar..." : "Publiko Produktin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
