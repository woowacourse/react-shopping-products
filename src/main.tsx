import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import GlobalStyle from "./GlobalStyle.style.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  // </React.StrictMode>
);
