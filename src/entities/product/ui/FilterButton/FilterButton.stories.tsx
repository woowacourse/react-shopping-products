import { FilterButton } from './FilterButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterButton> = {
  title: '4. entities/FilterButton',
  component: FilterButton,
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof FilterButton>;

export const Common: Story = {};
