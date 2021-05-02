import { createMuiTheme, useTheme, Theme } from "@material-ui/core/styles";
import { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints"

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
        fontFamily: '"AvenirNext"',
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
            main: "#2C630B",
            dark: "#3c4045",
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
        MuiAppBar: {
            colorPrimary: {
                color: "#2C630B",
                backgroundColor: "white",
            }
        },
    },
});
