import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    ml: true;
    lg: true;
    xl: true;
  }
}

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    // fontWeightSemiBold: 600,
    fontWeightBold: 700,
    // fontWeightExtraBold: 900,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      ml: 1300,
      lg: 1500,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#65BC30",
      dark: "#2C630B",
      light: "#4AA513",
    },
    secondary: {
      main: "#fffa7e",
      dark: "#d8d366",
      light: "#fffddc",
    },
    text: {
      primary: "#3c4045",
      secondary: "#848ca5",
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: `2.5rem`, //40px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      h2: {
        fontSize: `2rem`, //32px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      h3: {
        fontSize: `1.5625rem`, //25px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      h4: {
        fontSize: `1.375rem`, //22px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      h5: {
        fontSize: `1.125rem`, //18px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      h6: {
        fontSize: `1rem`, //16px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      body1: {
        fontSize: `.875rem`, //14px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
      body2: {
        fontSize: `.75rem`, //12px
        fontWeight: "inherit",
        lineHeight: "inherit",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        color: "#2C630B",
        backgroundColor: "white",
      },
    },
    MuiButtonBase: {
      root: {
        transition: "all .2s ease-in-out !important",
      },
    },
    MuiToolbar: {
      gutters: {
        [defaultTheme.breakpoints.down("xs")]: {
          paddingLeft: ".8rem",
          paddingRight: ".8rem",
        },
      },
    },
    MuiStepIcon: {
      text: {
        fill: "white",
      },
    },
  },
});
