import ProductCard from '../ProductCard'

export default function ProductCardExample() {
  return (
    <div className="p-4 max-w-[200px]">
      <ProductCard
        id="1"
        name="Букет розовых роз"
        price={150000}
        image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop"
        isFavorite={false}
        onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onClick={(id) => console.log('Product clicked:', id)}
      />
    </div>
  )
}
