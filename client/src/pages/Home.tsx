import { useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

//todo: remove mock functionality
const mockProducts = [
  { id: '1', name: 'Букет красных роз', price: 150000, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop', isFavorite: false },
  { id: '2', name: 'Розовые тюльпаны', price: 90000, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop', isFavorite: false },
  { id: '3', name: 'Белые пионы', price: 120000, image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=400&h=400&fit=crop', isFavorite: false },
  { id: '4', name: 'Букет полевых цветов', price: 75000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop', isFavorite: false },
  { id: '5', name: 'Фиолетовые лаванды', price: 85000, image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=400&fit=crop', isFavorite: false },
  { id: '6', name: 'Желтые герберы', price: 95000, image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=400&fit=crop', isFavorite: false },
  { id: '7', name: 'Розовые пионы', price: 130000, image: 'https://images.unsplash.com/photo-1588509095738-c342c5d917d2?w=400&h=400&fit=crop', isFavorite: false },
  { id: '8', name: 'Подсолнухи', price: 70000, image: 'https://images.unsplash.com/photo-1597848212624-e30b9aeb6394?w=400&h=400&fit=crop', isFavorite: false },
  { id: '9', name: 'Белые розы', price: 140000, image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop', isFavorite: false },
  { id: '10', name: 'Сиреневые хризантемы', price: 100000, image: 'https://images.unsplash.com/photo-1563535655-c6d52fdf3a89?w=400&h=400&fit=crop', isFavorite: false },
  { id: '11', name: 'Смешанный букет', price: 110000, image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400&h=400&fit=crop', isFavorite: false },
  { id: '12', name: 'Орхидеи', price: 160000, image: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=400&h=400&fit=crop', isFavorite: false },
];

const mockCategories = [
  { id: 'roses', name: 'Розы', icon: '🌹' },
  { id: 'tulips', name: 'Тюльпаны', icon: '🌷' },
  { id: 'bouquets', name: 'Букеты', icon: '💐' },
  { id: 'peonies', name: 'Пионы', icon: '🏵️' },
];

// Map product names to categories
const productCategories: Record<string, string> = {
  '1': 'roses',
  '2': 'tulips',
  '3': 'peonies',
  '4': 'bouquets',
  '5': 'bouquets',
  '6': 'bouquets',
  '7': 'peonies',
  '8': 'bouquets',
  '9': 'roses',
  '10': 'bouquets',
  '11': 'bouquets',
  '12': 'bouquets',
};

interface HomeProps {
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onProductClick: (id: string) => void;
  cartCount: number;
  favoritesCount: number;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  favoriteIds: string[];
  cartItemIds: string[];
}

export default function Home({
  onCartClick,
  onFavoritesClick,
  onProductClick,
  cartCount,
  favoritesCount,
  onAddToCart,
  onToggleFavorite,
  favoriteIds,
  cartItemIds,
}: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("new");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const productsPerPage = 12;
  
  // Apply filtering and sorting
  let filteredProducts = [...mockProducts];
  
  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      product => productCategories[product.id] === selectedCategory
    );
  }
  
  // Filter by price range
  const minPrice = priceFrom ? parseFloat(priceFrom) : 0;
  const maxPrice = priceTo ? parseFloat(priceTo) : Infinity;
  
  if (priceFrom || priceTo) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );
  }
  
  // Apply sorting
  switch (selectedSort) {
    case 'new':
      // Keep original order (newest first)
      break;
    case 'old':
      filteredProducts = filteredProducts.reverse();
      break;
    case 'price-asc':
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      break;
  }
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCartClick={onCartClick}
        onFavoritesClick={onFavoritesClick}
        cartCount={cartCount}
        favoritesCount={favoritesCount}
      />
      
      <FilterBar
        categories={mockCategories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        priceFrom={priceFrom}
        priceTo={priceTo}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
      />

      <ProductGrid
        products={displayedProducts}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
        favoriteIds={favoriteIds}
        cartItemIds={cartItemIds}
        onCartClick={onCartClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
