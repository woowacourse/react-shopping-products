import { createContext } from 'react';
import type { DataResourceType } from '../types/data';
import type { CartItemType, ProductItemType } from '../types/data';

interface DataContextType {
  cartItemsResource: DataResourceType<CartItemType[]>;
  productItemsResource: DataResourceType<ProductItemType[]>;
}

interface DataContextProps {
  dataResource: DataContextType;
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ dataResource, children }: DataContextProps) => {
  return <DataContext.Provider value={dataResource}>{children}</DataContext.Provider>;
};
