import { Spinner } from './Spinner';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: '5. shared/Spinner',
  component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Common: Story = {};
