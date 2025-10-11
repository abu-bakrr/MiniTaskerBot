import Header from '../Header'

export default function HeaderExample() {
  return (
    <Header 
      favoritesCount={3}
      cartCount={2}
      onFavoritesClick={() => console.log('Favorites clicked')}
      onCartClick={() => console.log('Cart clicked')}
    />
  )
}
