import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],

  args: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return <Header />;
  },
};

export const Left: Story = {
  render: () => {
    return <Header leftComponent={<div>LOGO</div>} />;
  },
};

export const Right: Story = {
  render: () => {
    return <Header rightComponent={<div>Right</div>} />;
  },
};

export const Dual: Story = {
  render: () => {
    return <Header leftComponent={<div>LOGO</div>} rightComponent={<div>Right</div>} />;
  },
};
