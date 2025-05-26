export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
  quantity: number;
};

export const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `상품 ${i + 1}`,
  price: 10000 + i * 500,
  imageUrl: `https://placehold.co/150x150?text=Product+${i + 1}`,
  category: i % 2 === 0 ? "식료품" : "패션잡화",
  // quantity: Math.floor(Math.random() * 10),
  quantity: 10,
}));
