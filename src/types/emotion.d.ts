import '@emotion/react';
import { AppTheme } from '../global/style/theme';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
