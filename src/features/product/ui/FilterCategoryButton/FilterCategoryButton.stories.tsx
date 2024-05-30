import { FilterCategoryButton } from './FilterCategoryButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterCategoryButton> = {
  title: '3. features/product/FilterCategoryButton',
  component: FilterCategoryButton,
  args: {
    value: 'all',
  },
};

export default meta;

type Story = StoryObj<typeof FilterCategoryButton>;

export const Common: Story = {};
