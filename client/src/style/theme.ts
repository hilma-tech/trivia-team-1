export const PrimaryFontColor: string = "#0C3249";
export const defaultTheme: object = {
  direction: "rtl",
  overrides: {
    MuiInput: {
      root: {},
    },
    MuiButton: {
      contained: {
        boxShadow: "none",
      },
    },
  },
  muiLink: {},
  typography: {
    fontFamily: "Rubik",

    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.5,
      color: PrimaryFontColor,
    },

    h2: {
      color: PrimaryFontColor,
    },
    h3: {
      color: PrimaryFontColor,
    },
    h4: {
      color: PrimaryFontColor,
    },
    h5: {
      color: PrimaryFontColor,
    },
    h6: {
      color: PrimaryFontColor,
    },
    p: {
      color: PrimaryFontColor,
      fontSize: "20px",
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
}