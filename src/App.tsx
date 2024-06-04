import "./App.css";
import { Header } from "./components/Header/Header";
import { ProductSection } from "./components/ProductSection/ProductSection";
import { ToastNotification } from "./components/ToastNotification/ToastNotification";

const App = () => {
  return (
    <>
      <Header />
      <ToastNotification />
      <ProductSection />
    </>
  );
};

export default App;
