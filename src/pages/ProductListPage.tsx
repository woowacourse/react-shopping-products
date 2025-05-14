import ErrorToast from '../components/ErrorToast';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';

export const ProductListPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  useEffect(() => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 3000);
  }, []);

  return (
    <>
      <Header />
      {errorOpen && <ErrorToast errorMessage="hi" />}
      <ProductItem />
    </>
  );
};
