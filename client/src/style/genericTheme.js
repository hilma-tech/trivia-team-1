import { createTheme } from "@material-ui/core/styles";

export const primaryFontColor = "#0C3249";

const theme = createTheme({
  direction: "rtl",
  overrides: {
    MuiInput: {
      root: {},
    },
    MuiButton: {
      root: {
        fontSize: "1rem",
      },
      contained: {
        boxShadow: "none",
      },
    },
  },
  muiLink:{

  },
  typography: {
    fontFamily: "Rubik",

    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.5,
      color: primaryFontColor,
    },

    h2: {
      color: primaryFontColor,
    },
    h3: {
      color: primaryFontColor,
    },
    h4: {
      color: primaryFontColor,
    },
    h5: {
      color: primaryFontColor,
    },
    h6: {
      color: primaryFontColor,
    },
    p: {
      color: primaryFontColor,
      fontSize: '20px'
    },
  },
  palette: {
    primary: {
      main: "#378381",
    },
    secondary: {
      main: "#985E4B",
    },
  },
});

export default theme;
