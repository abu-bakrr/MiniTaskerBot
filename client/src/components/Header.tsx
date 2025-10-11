import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onFavoritesClick?: () => void;
  onCartClick?: () => void;
  favoritesCount?: number;
  cartCount?: number;
}

export default function Header({ 
  onFavoritesClick, 
  onCartClick,
  favoritesCount = 0,
  cartCount = 0 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3" data-testid="header-main">
      <div className="max-w-[420px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🌸</div>
          <h1 className="text-lg font-semibold text-foreground" data-testid="text-brand-name">
            Flowery Bloom
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onFavoritesClick}
            className="relative"
            data-testid="button-favorites"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" data-testid="text-favorites-count">
                {favoritesCount}
              </span>
            )}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={onCartClick}
            className="relative"
            data-testid="button-cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" data-testid="text-cart-count">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
