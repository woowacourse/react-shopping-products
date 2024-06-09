import type { Meta, StoryObj } from '@storybook/react';

import EmptyCartFallback from './EmptyCartFallback';

const meta = {
  title: 'Components/EmptyCartFallback',
  component: EmptyCartFallback,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyCartFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
