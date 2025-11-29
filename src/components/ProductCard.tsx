import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  onClick: () => void;
}

export const ProductCard = ({
  title,
  price,
  image,
  location,
  category,
  rating,
  reviewCount,
  onClick,
}: ProductCardProps) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-primary/20"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-xl line-clamp-2 flex-1 group-hover:text-primary transition-colors">{title}</h3>
          <Badge variant="secondary" className="shrink-0 font-medium">{category}</Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2 font-medium">({reviewCount})</span>
          </div>
          
          <div className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
            €{price.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
