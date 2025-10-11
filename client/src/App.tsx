import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Favorites from "@/pages/Favorites";
import Product from "@/pages/Product";

//todo: remove mock functionality
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

type Page = 'home' | 'cart' | 'favorites' | 'product';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  const handleAddToCart = (id: string) => {
    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      //todo: remove mock functionality - fetch real product data
      const mockProduct = {
        id,
        name: 'Букет цветов',
        price: 100000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200',
      };
      setCartItems([...cartItems, mockProduct]);
    }
    console.log('Added to cart:', id);
  };

  const handleToggleFavorite = (id: string) => {
    const isFavorite = favoriteItems.some(item => item.id === id);
    
    if (isFavorite) {
      setFavoriteItems(favoriteItems.filter(item => item.id !== id));
    } else {
      //todo: remove mock functionality - fetch real product data
      const mockProduct = {
        id,
        name: 'Букет цветов',
        price: 100000,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
        isFavorite: true,
      };
      setFavoriteItems([...favoriteItems, mockProduct]);
    }
    console.log('Toggled favorite:', id);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product');
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="max-w-[420px] mx-auto bg-background min-h-screen">
          {currentPage === 'home' && (
            <Home
              onCartClick={() => setCurrentPage('cart')}
              onFavoritesClick={() => setCurrentPage('favorites')}
              onProductClick={handleProductClick}
              cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              favoritesCount={favoriteItems.length}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          
          {currentPage === 'cart' && (
            <Cart
              items={cartItems}
              onBack={() => setCurrentPage('home')}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          )}
          
          {currentPage === 'favorites' && (
            <Favorites
              items={favoriteItems}
              onBack={() => setCurrentPage('home')}
              onClearAll={handleClearFavorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          )}
          
          {currentPage === 'product' && (
            <Product
              productId={selectedProductId}
              onBack={() => setCurrentPage('home')}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteItems.some(item => item.id === selectedProductId)}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
