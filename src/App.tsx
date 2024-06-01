import './reset.css';
import ToastContainer from './components/common/Toast/ToastContainer';
import ProductListPage from './pages/ProductListPage';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '472px' }}>
        <ProductListPage />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
