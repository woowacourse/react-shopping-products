import GlobalStyles from '../src/styles/Global.style';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const queryClient = new QueryClient();
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};
export const decorators: React.FC[] = [
  (Story) => (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </>
  ),
];
export default preview;
