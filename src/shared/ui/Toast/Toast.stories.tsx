import { Toast } from './Toast';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  title: '5. shared/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <div style={{ width: '420px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Common: Story = {
  args: {
    children: 'This is Toast Message.',
    duration: 10000,
  },
};
