import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],

  args: {},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    return <Text size="s">안녕</Text>;
  },
};

export const M: Story = {
  render: () => {
    return <Text size="m">안녕</Text>;
  },
};

export const L: Story = {
  render: () => {
    return (
      <Text size="l" weight="l">
        안녕
      </Text>
    );
  },
};
