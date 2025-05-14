export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInCart?: boolean;
}
