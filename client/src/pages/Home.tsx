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

const mockColors = ['#FF6B9D', '#FFB6C1', '#DDA0DD', '#E6E6FA', '#FFFACD'];

interface HomeProps {
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onProductClick: (id: string) => void;
  cartCount: number;
  favoritesCount: number;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function Home({
  onCartClick,
  onFavoritesClick,
  onProductClick,
  cartCount,
  favoritesCount,
  onAddToCart,
  onToggleFavorite,
}: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSort, setSelectedSort] = useState("new");

  const productsPerPage = 12;
  const totalPages = Math.ceil(mockProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = mockProducts.slice(startIndex, startIndex + productsPerPage);

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
        colors={mockColors}
        selectedCategory={selectedCategory}
        selectedColor={selectedColor}
        selectedSort={selectedSort}
        onCategoryChange={setSelectedCategory}
        onColorChange={setSelectedColor}
        onSortChange={setSelectedSort}
      />

      <ProductGrid
        products={displayedProducts}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
