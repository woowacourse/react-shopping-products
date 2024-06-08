import { PropsWithChildren } from 'react';
import { ItemListContainer } from './ProductItemList.style';

const ItemList: React.FC<PropsWithChildren> = ({ children }) => {
  return <ItemListContainer>{children}</ItemListContainer>;
};

export default ItemList;
