interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItemProps {
  id: number;
  quantity: number;
  product: ProductProps;
}
