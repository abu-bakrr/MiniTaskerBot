import FilterBar from '../FilterBar'

export default function FilterBarExample() {
  const categories = [
    { id: 'roses', name: 'Розы', icon: '🌹' },
    { id: 'tulips', name: 'Тюльпаны', icon: '🌷' },
    { id: 'bouquets', name: 'Букеты', icon: '💐' },
  ]
  
  const colors = ['#FF6B9D', '#FFB6C1', '#DDA0DD', '#E6E6FA', '#FFFACD']
  
  return (
    <FilterBar 
      categories={categories}
      colors={colors}
      selectedCategory="all"
      selectedColor="all"
      selectedSort="new"
      onCategoryChange={(cat) => console.log('Category:', cat)}
      onColorChange={(color) => console.log('Color:', color)}
      onSortChange={(sort) => console.log('Sort:', sort)}
    />
  )
}
