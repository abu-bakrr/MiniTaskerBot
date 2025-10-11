import CartItem from '../CartItem'

export default function CartItemExample() {
  return (
    <div className="p-4 max-w-[420px]">
      <CartItem
        id="1"
        name="Букет красных роз"
        price={150000}
        quantity={2}
        image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200"
        onQuantityChange={(id, qty) => console.log('Quantity:', id, qty)}
        onRemove={(id) => console.log('Remove:', id)}
      />
    </div>
  )
}
