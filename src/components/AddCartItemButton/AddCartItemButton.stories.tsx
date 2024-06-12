import type { Meta, StoryObj } from '@storybook/react';

import AddCartItemButton from './AddCartItemButton';

const meta = {
  title: 'Components/AddCartItemButton',
  component: AddCartItemButton,
  tags: ['autodocs'],
  argTypes: { isInCart: { description: '', control: { type: 'boolean' } } },
} satisfies Meta<typeof AddCartItemButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
