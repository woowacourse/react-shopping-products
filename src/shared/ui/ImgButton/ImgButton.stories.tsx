import { assets } from '../../assets/assets';
import { Text } from '../Text/Text';

import { ImgButton } from './ImgButton';

import type { Meta, StoryObj } from '@storybook/react';
import css from './ImgButton.storibook.module.css';

const meta: Meta<typeof ImgButton> = {
  title: '5. shared/ImgButton',
  component: ImgButton,
  args: {
    alt: 'button',
    src: assets.cart,
    type: 'button',
    onClick: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof ImgButton>;

export const OnlyImage: Story = {};

export const WithText: Story = {
  args: {
    children: (
      <Text tag={'p'} type={'h1'}>
        text
      </Text>
    ),
    className: css.imgButton,
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid white' }}>
        <Story />
      </div>
    ),
  ],
};
