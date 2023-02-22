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
      fontWeight: "bolder",
      lineHeight: 1.5,
      color: PrimaryFontColor,
    },
    h2: {
      color: PrimaryFontColor,
      fontWeight: 100
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
    body1: {
      color: PrimaryFontColor,
      fontSize: "20px",
    },
  },
  palette: {
    primary: {
      main: "#378381",
    },
    secondary: {
      main: "#BE7F6B",
    },
  },
}