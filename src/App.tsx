import "./App.css";
import { Header } from "./components/Header/Header";
import { Product } from "./components/Product/Product";
import { ToastNotification } from "./components/ToastNotification/ToastNotification";
import { ErrorProvider } from "./context/errorContext";

const App = () => {
  return (
    <ErrorProvider>
      <Header />
      <ToastNotification />
      <Product />
    </ErrorProvider>
  );
};

export default App;
