import { useContext } from 'react';
import { CartContext } from './ShoppingCartCountContext';

export const useCart = () => useContext(CartContext);
