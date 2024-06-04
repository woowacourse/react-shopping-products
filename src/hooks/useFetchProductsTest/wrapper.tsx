import { Global, ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import GlobalLayout from '../../layouts/GlobalLayout';
import theme from '../../theme';
import { globalStyles } from '../../globalStyle';

interface WrapperProps {
  children: ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <GlobalLayout>{children}</GlobalLayout>
  </ThemeProvider>
);

export default wrapper;
