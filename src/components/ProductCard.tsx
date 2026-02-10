import { Star, MapPin, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  userId?: string;
  onClick: () => void;
}

export const ProductCard = ({
  id,
  title,
  price,
  image,
  location,
  category,
  rating,
  reviewCount,
  userId,
  onClick,
}: ProductCardProps) => {
  const { user } = useAuth();
  const isOwner = user && userId && user.id === userId;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Je i sigurt që dëshiron ta fshish këtë produkt?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Gabim gjatë fshirjes");
    } else {
      toast.success("Produkti u fshi me sukses");
    }
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover-lift glass border-border/30 rounded-2xl"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary/30 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 font-medium glass-strong rounded-lg"
        >
          {category}
        </Badge>
        {isOwner && (
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted/50"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">({reviewCount})</span>
          </div>
          
          <div className="text-2xl font-display font-bold text-gradient">
            {price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
