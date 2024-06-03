import { assets } from '../../assets/assets';

import { ImgButton } from './ImgButton';

import type { Meta, StoryObj } from '@storybook/react';
import css from './ImgButton.storybook.module.css';

const meta: Meta<typeof ImgButton> = {
  title: '5. shared/ImgButton',
  component: ImgButton,
  args: {
    className: css.imgButton,
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
    children: 'text',
  },
};
