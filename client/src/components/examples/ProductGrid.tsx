import ProductGrid from '../ProductGrid'

export default function ProductGridExample() {
  const products = [
    { id: '1', name: 'Букет красных роз', price: 150000, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400' },
    { id: '2', name: 'Тюльпаны микс', price: 90000, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400' },
    { id: '3', name: 'Белые пионы', price: 120000, image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=400' },
    { id: '4', name: 'Полевые цветы', price: 75000, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400' },
  ]
  
  return (
    <ProductGrid
      products={products}
      onToggleFavorite={(id) => console.log('Favorite:', id)}
      onAddToCart={(id) => console.log('Add to cart:', id)}
      onProductClick={(id) => console.log('Product click:', id)}
    />
  )
}
