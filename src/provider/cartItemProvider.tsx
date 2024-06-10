// import { ERROR_MESSAGES } from "@/constants/messages";
// import { useCartItemsQuery } from "@/hooks/server/useCartItems";
// import useToast from "@/hooks/useToast";
// import { CartItems } from "@/types/products";
// import { ReactNode, createContext, useEffect } from "react";
// import { useState } from "react";

// export const CartItemContext = createContext<CartItems[]>([]);
// export const CartItemDispatchContext = createContext<React.Dispatch<React.SetStateAction<CartItems[]>>>(() => {});

// const CartItemProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItems[]>([]);
//   const { onAddToast } = useToast();

//   // const getCartItemList = async () => {
//   //   try {
//   //     const res = await getCartItems();
//   //     setCartItems(res);
//   //   } catch (error) {
//   //     onAddToast(ERROR_MESSAGES.failGetCartItems);
//   //   }
//   // };

//   const { data, isError } = useCartItemsQuery();

//   console.log(data);

//   useEffect(() => {
//     if (data) {
//       setCartItems(data);
//     }
//     if (isError) {
//       onAddToast(ERROR_MESSAGES.failGetCartItems);
//     }
//   }, []);

//   return (
//     <CartItemContext.Provider value={cartItems}>
//       <CartItemDispatchContext.Provider value={setCartItems}>{children}</CartItemDispatchContext.Provider>
//     </CartItemContext.Provider>
//   );
// };

// export default CartItemProvider;
