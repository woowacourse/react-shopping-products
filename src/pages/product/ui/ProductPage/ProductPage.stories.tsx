import { ProductPage } from './ProductPage';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductPage> = {
  title: '1. pages/cart/ProductPage',
  component: ProductPage,
  decorators: [
    (Story) => (
      <div style={{ width: '430px', border: '1px dashed white' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProductPage>;

export const Common: Story = {};
