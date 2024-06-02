import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import GlobalStyle from "./GlobalStyle.style.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>,
  // </React.StrictMode>
);
