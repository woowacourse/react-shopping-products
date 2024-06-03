import { LayoutHeader } from './LayoutHeader';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LayoutHeader> = {
  title: '2. Widgets/LayoutHeader/LayoutHeader',
  component: LayoutHeader,
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '420px', border: '1px dashed white' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof LayoutHeader>;

const slot = (label: string) => (
  <div style={{ border: '1px dashed white', color: 'white', padding: '5px' }}>{label}</div>
);

export const Common: Story = {
  args: {
    leftSlot: slot('Left Slot'),
    rightSlot: slot('Right Slot'),
  },
};
