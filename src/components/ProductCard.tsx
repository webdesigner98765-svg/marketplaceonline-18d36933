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
      className="group cursor-pointer overflow-hidden hover:shadow-card-hover transition-smooth border-border"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">{title}</h3>
          <Badge variant="secondary" className="shrink-0">{category}</Badge>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
          </div>
          
          <div className="text-2xl font-bold text-primary">
            €{price.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
