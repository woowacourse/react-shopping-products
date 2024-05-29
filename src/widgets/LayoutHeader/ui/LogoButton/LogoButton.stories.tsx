import { LogoButton } from './LogoButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LogoButton> = {
  title: '2. Widgets/LayoutHeader/LogoButton',
  component: LogoButton,
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

type Story = StoryObj<typeof LogoButton>;

export const Common: Story = {};
