import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  //Theming for MUI
  let theme = createTheme({
    palette: {
      primary: {
        dark: "#2e7031",
        main: "#43a047",
        light: "#68b36b",
        contrastText: "#000",
      },
      secondary: {
        dark: "#00a152",
        main: "#00e676",
        light: "#33eb91",
        contrastText: "#000",
      },
    },
    typography: {
      fontFamily: "Helvetica",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            backgroundColor: "#d8e8d8",
            height: "3em",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            paddingTop: "0.8em",
            fontWeight: "bold",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            padding: "0.5em",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            minHeight: "3.3em",
            justifyContent: "center",
          },
        },
      },
    },
  });

  theme = createTheme(theme, {
    palette: {
      info: {
        main: theme.palette.secondary.main,
      },
    },
  });

  //Auto redirect to login path
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login", { replace: true });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
