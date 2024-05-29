import { CATEGORIES } from '../../model/constants';
import { ProductCard } from './ProductCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  title: '4. entities/product/ProductCard',
  component: ProductCard,
  args: {
    actionSlot: <div style={{ padding: '3px', border: '1px dashed black', fontSize: '10px' }}>ActionSlot</div>,
    product: {
      id: 1,

      name: 'Product',
      imageUrl: 'https://picsum.photos/200/300',
      price: 10000,
      category: CATEGORIES[0],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Common: Story = {};
