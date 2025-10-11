import ProductDetail from '../ProductDetail'

export default function ProductDetailExample() {
  const images = [
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600',
    'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=600',
  ]
  
  return (
    <ProductDetail
      id="1"
      name="Букет красных роз"
      description="Изысканный букет из свежих красных роз. Идеально подходит для выражения любви и признательности. 15 стеблей премиум класса."
      price={150000}
      images={images}
      isFavorite={false}
      onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
      onAddToCart={(id) => console.log('Add to cart:', id)}
      onBack={() => console.log('Back')}
    />
  )
}
