import { useContext } from 'react';
import { CartContext } from '../context/ShoppingCartCountContext';

export const useCart = () => useContext(CartContext);
