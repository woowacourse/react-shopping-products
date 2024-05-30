import { useState } from 'react';

import { Product } from '@/entities/product';
import { Layout } from '@/shared';
import products from '@/shared/mocks/products.json';
import { ContentHeader } from '@/widgets/ContentHeader';
import { HeaderCartButton, HeaderLogoButton, LayoutHeader } from '@/widgets/LayoutHeader';
import { ProductList } from '@/widgets/ProductList';

export const ProductPage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  setCartItemCount;

  return (
    <Layout
      headerSlot={
        <LayoutHeader leftSlot={<HeaderLogoButton />} rightSlot={<HeaderCartButton cartItemCount={cartItemCount} />} />
      }
      contentHeaderSlot={<ContentHeader title={'상품 목록'} />}
      contentBodySlot={
        <div>
          <ProductList products={products as Product[]} />
        </div>
      }
      gap={{ top: 24 }}
    />
  );
};
