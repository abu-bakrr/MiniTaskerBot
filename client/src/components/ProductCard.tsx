import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  onClick,
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onToggleFavorite?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(id);
  };

  return (
    <div
      onClick={() => onClick?.(id)}
      className="bg-card rounded-md border border-card-border overflow-hidden cursor-pointer"
      data-testid={`card-product-${id}`}
    >
      <div className="relative aspect-square bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
          data-testid={`button-favorite-${id}`}
        >
          <Heart
            className={`w-5 h-5 ${favorite ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1" data-testid={`text-product-name-${id}`}>
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-foreground" data-testid={`text-product-price-${id}`}>
            {price.toLocaleString()} сум
          </p>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAddToCart}
            className="h-8 w-8"
            data-testid={`button-add-to-cart-${id}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
