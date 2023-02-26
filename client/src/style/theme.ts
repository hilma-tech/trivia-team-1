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
    fontFamily: "'Rubik', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: "1000",
      lineHeight: 1.5,
      color: PrimaryFontColor,
      
    },
    h2: {
      color: PrimaryFontColor,
      fontWeight: '600'
    },
    h3: {
      color: PrimaryFontColor,
      fontWeight: '600'
    },
    h4: {
      color: PrimaryFontColor,
      fontWeight: '600'
    },
    h5: {
      color: PrimaryFontColor,
      fontWeight: '600'
    },
    h6: {
      color: PrimaryFontColor,
      fontWeight: '600'
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