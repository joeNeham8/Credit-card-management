import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    primary: "#4FD1C5",       // teal.300
    secondary: "#2B6CB0",     // blue.600
    accent: "#F6AD55",        // orange.300
    background: "#F7FAFC",    // gray.50
    darkBg: "#1A202C",        // gray.800
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === "dark" ? "brand.darkBg" : "brand.background",
      color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      fontFamily: "'Inter', sans-serif",
    },
  }),
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "bold",
    },
    variants: {
      solid: (props: any) => ({
        bg: props.colorMode === "dark" ? "brand.accent" : "brand.primary",
        color: "white",
        _hover: {
          bg:
            props.colorMode === "dark"
              ? "orange.400"
              : "teal.400",
        },
      }),
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
});

export default theme;
