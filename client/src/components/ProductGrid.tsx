import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  isFavorite?: boolean;
}

interface ProductGridProps {
  products: Product[];
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onProductClick?: (id: string) => void;
  favoriteIds?: string[];
  cartItemIds?: string[];
  onCartClick?: () => void;
}

export default function ProductGrid({
  products,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
  favoriteIds = [],
  cartItemIds = [],
  onCartClick,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center" data-testid="empty-products">
        <div className="text-6xl mb-4">🌸</div>
        <h3 className="text-lg font-medium text-foreground mb-2">Товаров нет</h3>
        <p className="text-sm text-muted-foreground">
          В данный момент нет доступных товаров
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4 max-w-[420px] mx-auto" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          isFavorite={favoriteIds.includes(product.id)}
          isInCart={cartItemIds.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
          onClick={onProductClick}
          onCartClick={onCartClick}
        />
      ))}
    </div>
  );
}
