import { Text } from './Text';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: '5. shared/Text',
  component: Text,
  decorators: [
    (Story) => (
      <div style={{ color: 'white' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    tag: 'p',
    children: 'text',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const TypeH1: Story = {
  args: {
    type: 'h1',
  },
};

export const TypeH2: Story = {
  args: {
    type: 'h2',
  },
};

export const TypeB1: Story = {
  args: {
    type: 'b1',
  },
};

export const TagP: Story = {
  render: () => (
    <div>
      <Text tag={'p'} type={'h1'}>
        text
      </Text>
      <Text tag={'p'} type={'h1'}>
        text
      </Text>
    </div>
  ),
};

export const TagSpan: Story = {
  render: () => (
    <div>
      <Text tag={'span'} type={'h1'}>
        text
      </Text>
      <Text tag={'span'} type={'h1'}>
        text
      </Text>
    </div>
  ),
};
