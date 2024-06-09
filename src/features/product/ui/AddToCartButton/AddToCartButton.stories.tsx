import { AddToCartButton } from './AddToCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddToCartButton> = {
  title: '3. features/product/AddToCartButton',
  component: AddToCartButton,
};

export default meta;

type Story = StoryObj<typeof AddToCartButton>;

export const Common: Story = {
  decorators: [
    (Story) => (
      <div style={{ border: '1px dashed white', borderRadius: '4px' }}>
        <Story />
      </div>
    ),
  ],
};
