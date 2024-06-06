import "./App.css";
import { Header } from "./components/Header/Header";
import { Product } from "./components/Product/Product";
import { ToastNotification } from "./components/ToastNotification/ToastNotification";

const App = () => {
  return (
    <div id="app">
      <Header />
      <ToastNotification />
      <Product />
    </div>
  );
};

export default App;
