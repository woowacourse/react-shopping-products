import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from './PageTitle';

const meta = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  args: { children: '타이틀입니다.' },
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
