import { useState } from 'react';
import { Layout } from '@/shared';
import { ContentHeader } from '@/widgets/ContentHeader';
import { HeaderCartButton, HeaderLogoButton, LayoutHeader } from '@/widgets/LayoutHeader';
import { ProductList } from '@/widgets/ProductList';
import products from '@/shared/mocks/products.json';
import { Product } from '@/entities/product';
import css from './ProductPage.module.css';

export const ProductPage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <Layout
      headerSlot={
        <LayoutHeader leftSlot={<HeaderLogoButton />} rightSlot={<HeaderCartButton cartItemCount={cartItemCount} />} />
      }
      contentHeaderSlot={<ContentHeader title={'상품 목록'} />}
      contentBodySlot={
        <div className={css.contentBodySlot}>
          <ProductList products={products as Product[]} />
        </div>
      }
      gap={{ top: 24 }}
    />
  );
};
