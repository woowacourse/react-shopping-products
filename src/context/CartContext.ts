import { useContext } from 'react';
import { CartContext } from './ShoppingCartContext';

export const useCart = () => useContext(CartContext);
