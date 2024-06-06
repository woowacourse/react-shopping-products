import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import QuantityStepper from './QuantityStepper';

const meta = {
  title: 'Components/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  argTypes: {
    quantity: {
      description: '',
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [
    () => {
      const [value, setValue] = useState(3);
      return (
        <QuantityStepper
          quantity={value}
          decreaseQuantity={() => setValue((prev) => Math.max(prev - 1, 0))}
          increaseQuantity={() => setValue((prev) => prev + 1)}
        />
      );
    },
  ],
};
