import { FilterSortOrderButton } from './FilterSortOrderButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterSortOrderButton> = {
  title: '3. features/product/FilterSortOrderButton',
  component: FilterSortOrderButton,
  args: {
    value: 'ascByPrice',
  },
};

export default meta;

type Story = StoryObj<typeof FilterSortOrderButton>;

export const Common: Story = {};
