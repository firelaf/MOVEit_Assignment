import LoginForm from "./components/LoginForm.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
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
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
          },
        },
      },
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
