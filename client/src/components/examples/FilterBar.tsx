import FilterBar from '../FilterBar'

export default function FilterBarExample() {
  const categories = [
    { id: 'roses', name: 'Розы', icon: '🌹' },
    { id: 'tulips', name: 'Тюльпаны', icon: '🌷' },
    { id: 'bouquets', name: 'Букеты', icon: '💐' },
  ]
  
  return (
    <FilterBar 
      categories={categories}
      selectedCategory="all"
      selectedSort="new"
      priceFrom=""
      priceTo=""
      onCategoryChange={(cat) => console.log('Category:', cat)}
      onSortChange={(sort) => console.log('Sort:', sort)}
      onPriceFromChange={(price) => console.log('Price from:', price)}
      onPriceToChange={(price) => console.log('Price to:', price)}
    />
  )
}
