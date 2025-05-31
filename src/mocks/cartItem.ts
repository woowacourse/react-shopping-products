import { CartItemType } from "@/types/cartItem";

interface mockCartItemType {
  content: CartItemType[];
}

export const mockCartData: mockCartItemType = {
  content: [
    {
      id: 2,
      quantity: 2,
      product: {
        id: 2,
        name: "메이토2",
        price: 2000,
        imageUrl: "",
        category: "식료품",
        quantity: 10,
      },
    },
    {
      id: 3,
      quantity: 3,
      product: {
        id: 3,
        name: "메이토3",
        price: 3000,
        imageUrl: "",
        category: "식료품",
        quantity: 10,
      },
    },
    {
      id: 4,
      quantity: 4,
      product: {
        id: 4,
        name: "메이토4",
        price: 4000,
        imageUrl: "",
        category: "식료품",
        quantity: 10,
      },
    },
    {
      id: 5,
      quantity: 5,
      product: {
        id: 5,
        name: "메이토5",
        price: 5000,
        imageUrl: "",
        category: "식료품",
        quantity: 10,
      },
    },
  ],
};
