import { HeaderCartButton } from './HeaderCartButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderCartButton> = {
  title: '2. Widgets/LayoutHeader/HeaderCartButton',
  component: HeaderCartButton,
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

type Story = StoryObj<typeof HeaderCartButton>;

export const Common: Story = {
  args: {
    cartItemCount: 5,
  },
};
