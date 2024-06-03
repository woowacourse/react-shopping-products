import GlobalStyles from "../src/styles/Global.style";

import type { Preview } from "@storybook/react";
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
export const decorators: React.FC[] = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  ),
];
export default preview;
