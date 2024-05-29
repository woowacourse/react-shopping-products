import Header from "./components/Header/Header";
import Product from "./pages/Product";
import GlobalStyles from "./styles/Global.style";

function App() {
  return (
    <>
      <GlobalStyles />
      {/* createPortal(
      <Toast message={""} />, document.body) */}
      <Header></Header>
      <Product />
    </>
  );
}

export default App;
