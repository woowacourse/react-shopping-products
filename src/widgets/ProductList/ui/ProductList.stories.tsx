import { ProductList } from './ProductList';

import type { Meta, StoryObj } from '@storybook/react';
import products from '@/shared/mocks/products.json';
import { Product } from '@/entities/product';

const meta: Meta<typeof ProductList> = {
  title: '2. Widgets/ProductList/ProductList',
  component: ProductList,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '380px' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Common: Story = {
  args: {
    products: products as Product[],
  },
};
