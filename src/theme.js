import { createTheme } from "@mui/material";

export const color = {
  primaryColor: "#1a22fc",
  primaryColor2: "#5a65f3",
  primaryColor3: "#dd6353",
  secondaryColor2: "#abb7d8",
  secondaryColor: "#a3a9df",
  whitebgColor: "#ececf2",
  whiteBgColor2: "#f1f3f9",
  textColor: "#514f53",
  grayColor: "#a1a1a6",
  grayColor2: "#7a727f",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: color.primaryColor2,
      light: color.primaryColor,
    },
    secondary: {
      main: color.secondaryColor,
      light: color.secondaryColor2,
    },

    // grayColor: color.grayColor,
    // grayColor2: color.grayColor2,
    // whiteBg: color.whitebgColor,
    // whiteBg2: color.whiteBgColor2,
  },
});
