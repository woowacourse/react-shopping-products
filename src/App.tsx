import { AppProvider } from "./components/Context/AppProvider";
import ProductListPage from "./components/Pages/ProductListPage";

function App() {
	return (
		<AppProvider>
			<ProductListPage />
		</AppProvider>
	);
}

export default App;
