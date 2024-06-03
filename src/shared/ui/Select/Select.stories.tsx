import { Select } from './Select';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Select> = {
  title: '5. shared/Select',
  component: Select,
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Common: Story = {};
