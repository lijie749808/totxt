import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
    },
  }),
};

const components = {
  Button: {
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
        color: props.colorMode === 'dark' ? 'gray.800' : 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.600',
        },
      }),
    },
  },
};

const fonts = {
  heading: '"Inter", sans-serif',
  body: '"Inter", sans-serif',
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  fonts,
});

export default theme;
