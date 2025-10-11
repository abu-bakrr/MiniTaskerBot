import { Heart, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
  isInCart?: boolean;
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
  onCartClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  isFavorite = false,
  isInCart = false,
  onToggleFavorite,
  onAddToCart,
  onClick,
  onCartClick,
}: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(id);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      onCartClick?.();
    } else {
      onAddToCart?.(id);
    }
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
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`}
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
            variant={isInCart ? "default" : "ghost"}
            onClick={handleCartClick}
            className="h-8 w-8"
            data-testid={`button-add-to-cart-${id}`}
          >
            {isInCart ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
