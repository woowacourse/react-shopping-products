import type { Meta, StoryObj } from '@storybook/react';

import { CartItem } from '../../types/type';

import CartItemCard from './CartItemCard';

const MOCK_DATA: CartItem = {
  id: 11,
  product: {
    id: 1,
    name: '리복',
    price: 23000,
    imageUrl:
      'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
    category: 'fashion',
  },
  quantity: 4,
};
const meta = {
  title: 'Components/CartItemCard',
  component: CartItemCard,
  tags: ['autodocs'],
  argTypes: {
    cartItem: {
      description: '',
      control: { type: 'object' },
    },
  },
  args: { cartItem: MOCK_DATA },
} satisfies Meta<typeof CartItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
