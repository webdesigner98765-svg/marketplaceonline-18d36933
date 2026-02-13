import { useState, useRef } from "react";
import { Upload, X, Image, Video } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

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

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const AddProductModal = ({ open, onClose, country }: AddProductModalProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      toast.error("Skedari është shumë i madh (max 20MB)");
      return;
    }

    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  const removeFile = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const isVideo = file?.type.startsWith("video/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !category || !contact) {
      toast.error("Plotëso të gjitha fushat");
      return;
    }

    if (!file) {
      toast.error("Duhet të ngarkosh një foto ose video");
      return;
    }

    if (price.trim().length > 100) {
      toast.error("Çmimi nuk mund të jetë më i gjatë se 100 karaktere");
      return;
    }

    if (!user) {
      toast.error("Duhet të hysh për të postuar");
      return;
    }

    setSubmitting(true);
    setUploadProgress(10);

    try {
      // Upload file
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;

      setUploadProgress(30);

      const { error: uploadError } = await supabase.storage
        .from("product-media")
        .upload(filePath, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      setUploadProgress(70);

      const { data: urlData } = supabase.storage
        .from("product-media")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      const { error } = await supabase.from("products").insert({
        title: title.trim(),
        price: price.trim(),
        description: description.trim(),
        category: category.toLowerCase(),
        contact: contact.trim(),
        country: country || undefined,
        user_id: user.id,
        image_url: imageUrl,
      });

      if (error) throw error;

      setUploadProgress(100);
      toast.success("Produkti u postua me sukses!");
      onClose();
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setContact("");
      removeFile();
      setUploadProgress(0);
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
              <Label htmlFor="price">Çmimi*</Label>
              <Input
                id="price"
                type="text"
                placeholder="p.sh. 50€, Falas, Me marrëveshje"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                maxLength={100}
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
            <Label htmlFor="contact">Kontakti* (telefon ose email)</Label>
            <Input
              id="contact"
              placeholder="p.sh. +355 69 123 4567 ose email@example.com"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* File Upload - Required */}
          <div className="space-y-2">
            <Label>Foto ose Video e Produktit* <span className="text-destructive">(e detyrueshme)</span></Label>

            {!file ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer"
              >
                <div className="flex justify-center gap-3 mb-2">
                  <Image className="w-8 h-8 text-muted-foreground" />
                  <Video className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Kliko për të ngarkuar foto ose video
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WebP, GIF, MP4, WebM (max 20MB)
                </p>
              </div>
            ) : (
              <div className="relative border border-border rounded-lg overflow-hidden">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full"
                  onClick={removeFile}
                >
                  <X className="w-4 h-4" />
                </Button>

                {isVideo ? (
                  <video
                    src={preview!}
                    controls
                    className="w-full max-h-64 object-contain bg-secondary/30"
                  />
                ) : (
                  <img
                    src={preview!}
                    alt="Preview"
                    className="w-full max-h-64 object-contain bg-secondary/30"
                  />
                )}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {submitting && uploadProgress > 0 && (
            <Progress value={uploadProgress} className="h-2" />
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Anulo
            </Button>
            <Button type="submit" variant="accent" className="flex-1" disabled={submitting}>
              {submitting ? "Duke ngarkuar..." : "Publiko Produktin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
