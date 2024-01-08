import { createTheme } from "@mui/material/";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EA5C2B",
    },
    secondary: {
      main: "#EA5C2B",
    },
    background: {
      default: "white",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
        InputProps: {
          style: { fontSize: "14px" },
        },
        InputLabelProps: {
          style: { fontSize: "14px" },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
        defaultValue:{
          style: { fontSize: "14px" },
        },
        sx:{
          fontSize: "14px",
        },
        },
      },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
