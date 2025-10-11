import OrderModal from '../OrderModal'

export default function OrderModalExample() {
  const items = [
    { name: 'Розы', quantity: 3, price: 150000 },
    { name: 'Тюльпаны', quantity: 2, price: 90000 },
  ]
  
  return (
    <OrderModal
      isOpen={true}
      items={items}
      total={330000}
      onClose={() => console.log('Modal closed')}
    />
  )
}
