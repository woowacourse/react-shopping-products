import { CartToggleButton } from './CartToggleButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartToggleButton> = {
  title: '4. features/product/CartToggleButton',
  component: CartToggleButton,
};

export default meta;

type Story = StoryObj<typeof CartToggleButton>;

export const AddToCart: Story = {
  args: {
    isInCart: false,
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px dashed white', borderRadius: '4px' }}>
        <Story />
      </div>
    ),
  ],
};

export const RemoveFromCart: Story = {
  args: {
    isInCart: true,
  },
};
