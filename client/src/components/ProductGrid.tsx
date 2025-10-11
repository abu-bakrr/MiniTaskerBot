import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

interface ProductGridProps {
  products: Product[];
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onProductClick?: (id: string) => void;
}

export default function ProductGrid({
  products,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 max-w-[420px] mx-auto" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}
