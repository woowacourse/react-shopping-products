import { HeaderLogoButton } from './HeaderLogoButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderLogoButton> = {
  title: '2. Widgets/LayoutHeader/HeaderLogoButton',
  component: HeaderLogoButton,
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '5px', border: '1px dashed white' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof HeaderLogoButton>;

export const Common: Story = {};
