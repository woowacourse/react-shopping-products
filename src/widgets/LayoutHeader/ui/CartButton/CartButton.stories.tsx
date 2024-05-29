import { CartButton } from './CartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CartButton> = {
  title: '2. Widgets/LayoutHeader/CartButton',
  component: CartButton,
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '5px', border: '1px dashed white' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof CartButton>;

export const Common: Story = {
  args: {
    cartItemCount: 5,
  },
};
