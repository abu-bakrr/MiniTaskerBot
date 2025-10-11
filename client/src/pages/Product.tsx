import ProductDetail from "@/components/ProductDetail";

//todo: remove mock functionality
const mockProduct = {
  id: '1',
  name: 'Букет красных роз',
  description: 'Изысканный букет из свежих красных роз премиум класса. Идеально подходит для выражения любви и признательности. В букете 15 крупных бутонов.',
  price: 150000,
  images: [
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=600&h=600&fit=crop',
  ],
};

interface ProductProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  isInCart: boolean;
  onCartClick: () => void;
}

export default function Product({
  productId,
  onBack,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  isInCart,
  onCartClick,
}: ProductProps) {
  return (
    <div className="min-h-screen bg-background pb-6">
      <ProductDetail
        {...mockProduct}
        isFavorite={isFavorite}
        isInCart={isInCart}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onBack={onBack}
        onCartClick={onCartClick}
      />
    </div>
  );
}
