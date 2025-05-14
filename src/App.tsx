import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import ShoppingList from './page/ShoppingList';

export type SortOption = '높은 가격순' | '낮은 가격순';

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/cart-items?page=0`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Basic ${import.meta.env.VITE_API_KEY}`,
  //         },
  //       }
  //     );
  //     const results = await response.json();
  //     console.log('results');
  //     setData(results);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <ShoppingList />
      </ThemeProvider>
    </>
  );
}

export default App;
