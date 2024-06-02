import type { Meta, StoryObj } from '@storybook/react';

import ProductItemList from './ProductItemList';

const meta = {
  title: 'Components/ProductItemList',
  component: ProductItemList,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItemList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
