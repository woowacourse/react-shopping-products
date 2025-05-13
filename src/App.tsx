import ShopPage from "./page/ShopPage";
import GlobalStyle from "./reset";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <GlobalStyle />
      <h1>React Shopping Products</h1>
      <ShopPage />
    </div>
  );
}

export default App;
