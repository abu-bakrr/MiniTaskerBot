import ProductDetail from "@/components/ProductDetail";

//todo: remove mock functionality
const mockProducts: Record<string, { id: string; name: string; description: string; price: number; images: string[] }> = {
  '1': {
    id: '1',
    name: 'Букет красных роз',
    description: 'Изысканный букет из свежих красных роз премиум класса. Идеально подходит для выражения любви и признательности. В букете 15 крупных бутонов.',
    price: 150000,
    images: [
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=600&h=600&fit=crop',
    ],
  },
  '2': {
    id: '2',
    name: 'Розовые тюльпаны',
    description: 'Нежные розовые тюльпаны из Голландии. Символ весны и новых начинаний. Букет из 25 свежих цветов.',
    price: 90000,
    images: [
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=600&fit=crop'
    ],
  },
  '3': {
    id: '3',
    name: 'Белые пионы',
    description: 'Роскошные белые пионы с нежным ароматом. Идеальны для свадеб и торжественных мероприятий. Букет из 11 пионов.',
    price: 120000,
    images: [
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1588509095738-c342c5d917d2?w=600&h=600&fit=crop'
    ],
  },
  '4': {
    id: '4',
    name: 'Букет полевых цветов',
    description: 'Яркий букет из полевых цветов. Создает атмосферу лета и свободы. Микс из различных сезонных цветов.',
    price: 75000,
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop'
    ],
  },
  '5': {
    id: '5',
    name: 'Фиолетовые лаванды',
    description: 'Ароматная лаванда с юга Франции. Успокаивающий аромат и нежная красота. Букет из 50 веточек.',
    price: 85000,
    images: [
      'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611251180451-d0be0a74d3fc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595261740315-67e6bf46ecad?w=600&h=600&fit=crop'
    ],
  },
  '6': {
    id: '6',
    name: 'Желтые герберы',
    description: 'Солнечные герберы, поднимающие настроение. Яркие и жизнерадостные цветы. Букет из 15 крупных гербер.',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1597848212624-e30b9aeb6394?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop'
    ],
  },
  '7': {
    id: '7',
    name: 'Розовые пионы',
    description: 'Очаровательные розовые пионы с пышными бутонами. Символ романтики и женственности. Букет из 9 пионов.',
    price: 130000,
    images: [
      'https://images.unsplash.com/photo-1588509095738-c342c5d917d2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&h=600&fit=crop'
    ],
  },
  '8': {
    id: '8',
    name: 'Подсолнухи',
    description: 'Яркие подсолнухи, символ счастья и оптимизма. Поднимают настроение в любую погоду. Букет из 7 больших подсолнухов.',
    price: 70000,
    images: [
      'https://images.unsplash.com/photo-1597848212624-e30b9aeb6394?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop'
    ],
  },
  '9': {
    id: '9',
    name: 'Белые розы',
    description: 'Элегантные белые розы, символ чистоты и невинности. Классический выбор для особых случаев. Букет из 21 розы.',
    price: 140000,
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=600&h=600&fit=crop'
    ],
  },
  '10': {
    id: '10',
    name: 'Сиреневые хризантемы',
    description: 'Изящные хризантемы сиреневого оттенка. Долго сохраняют свежесть. Букет из 15 веточек.',
    price: 100000,
    images: [
      'https://images.unsplash.com/photo-1563535655-c6d52fdf3a89?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&h=600&fit=crop'
    ],
  },
  '11': {
    id: '11',
    name: 'Смешанный букет',
    description: 'Оригинальный микс из различных сезонных цветов. Каждый букет уникален. Яркое сочетание форм и оттенков.',
    price: 110000,
    images: [
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop'
    ],
  },
  '12': {
    id: '12',
    name: 'Орхидеи',
    description: 'Экзотические орхидеи премиум класса. Символ роскоши и утонченности. Композиция из 5 веток орхидей.',
    price: 160000,
    images: [
      'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop'
    ],
  },
};

interface ProductProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  isInCart: boolean;
  onCartClick: () => void;
}

export default function Product({
  productId,
  onBack,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  isInCart,
  onCartClick,
}: ProductProps) {
  const product = mockProducts[productId] || mockProducts['1'];
  
  return (
    <div className="min-h-screen bg-background pb-6">
      <ProductDetail
        {...product}
        isFavorite={isFavorite}
        isInCart={isInCart}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onBack={onBack}
        onCartClick={onCartClick}
      />
    </div>
  );
}
