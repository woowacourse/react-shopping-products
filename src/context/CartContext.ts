import { useContext } from 'react';
import { CartContext } from '../hooks/useCartItem';

export const useCart = () => useContext(CartContext);
