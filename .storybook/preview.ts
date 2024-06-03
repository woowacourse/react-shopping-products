import type { Preview } from '@storybook/react';
import '@/shared/styles/reset.css';
import '@/shared/styles/color.css';
import '@/shared/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
