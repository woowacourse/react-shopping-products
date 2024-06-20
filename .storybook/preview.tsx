import type { Preview } from '@storybook/react';
import '../src/reset.css';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import theme from '../src/styles/theme';
import { ThemeProvider } from 'styled-components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: theme,
    Provider: ThemeProvider,
  }),
];

export default preview;
