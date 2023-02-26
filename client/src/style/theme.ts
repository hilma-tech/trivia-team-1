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
      fontWeight: 'bold'
    },
    h3: {
      color: PrimaryFontColor,
      fontWeight: 'bold'
    },
    h4: {
      color: PrimaryFontColor,
      fontWeight: 'bold'
    },
    h5: {
      color: PrimaryFontColor,
      fontWeight: 'bold'
    },
    h6: {
      color: PrimaryFontColor,
      fontWeight: 'bold'
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