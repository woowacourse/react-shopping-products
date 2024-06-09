import { DEFAULT_SORT_ORDER } from '@/shared';

import { FilterSortOrderButton } from './FilterSortOrderButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterSortOrderButton> = {
  title: '3. features/product/FilterSortOrderButton',
  component: FilterSortOrderButton,
  args: {
    value: DEFAULT_SORT_ORDER,
  },
};

export default meta;

type Story = StoryObj<typeof FilterSortOrderButton>;

export const Common: Story = {};
