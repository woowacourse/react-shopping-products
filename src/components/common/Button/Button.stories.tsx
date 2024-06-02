import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'fit'],
    },
    width: {
      description: '',
      control: { type: 'radio' },
      options: ['fit', 'full', 'custom'],
    },
    customWidth: {
      if: { arg: 'width', eq: 'custom' },
      description: '',
      control: { type: 'number' },
    },
    radius: {
      description: '',
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'custom'],
    },
    customRadius: {
      if: { arg: 'radius', eq: 'custom' },
      description: '',
      control: { type: 'number' },
    },
    color: {
      description: '',
      control: { type: 'radio' },
      options: ['default', 'primary'],
    },
    square: {
      description: '',
      control: { type: 'boolean' },
    },
    isDisabled: {
      description: '',
      control: { type: 'boolean' },
    },
    onClick: {
      description: '',
    },
    children: {
      description: '',
      control: { type: 'text' },
    },
  },
  args: {
    size: 's',
    width: 'fit',
    customWidth: 0,
    radius: 'm',
    customRadius: 0,
    color: 'default',
    square: false,
    isDisabled: false,
    children: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    if (args.customWidth) {
      args.width = args.customWidth;
    }
    if (args.customRadius) {
      args.radius = args.customRadius;
    }
    return <Button {...args}>{args.children}</Button>;
  },
};
