export const STYLE_THEME = {
  color: {
    white: '#ffffff',
    lightGray: '#EAEAEA',
    black: '#000000',
    blackWithOpacity: 'rgba(0, 0, 0, 0.1)',
    lightRed: '#FFC9C9',
  },
  fontSize: {
    xs: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '2rem',
    xl: '2.4rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
};

export const BUTTON_THEME = {
  black: {
    backgroundColor: STYLE_THEME.color.black,
    color: STYLE_THEME.color.white,
  },
  white: {
    backgroundColor: STYLE_THEME.color.white,
    color: STYLE_THEME.color.black,
  },
  gray: {
    backgroundColor: STYLE_THEME.color.lightGray,
    color: STYLE_THEME.color.black,
  },
  disabled: {
    backgroundColor: STYLE_THEME.color.blackWithOpacity,
    color: STYLE_THEME.color.black,
  },
};
