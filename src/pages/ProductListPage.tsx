import ErrorToast from '../components/ErrorToast';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import { useEffect, useState } from 'react';
import Select from '../components/Select';

export const ProductListPage = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const options = ['옵션1', '옵션2', '옵션3', '옵션4', '옵션5'];
  const [value, setValue] = useState(options[0]);

  const handleSelectedValue = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 3000);
    setValue('선택된 값');
  }, []);

  return (
    <>
      <Header />
      {errorOpen && <ErrorToast errorMessage="hi" />}
      <ProductItem />
      <Select
        value={value}
        options={options}
        handleSelectedValue={(value: string) => handleSelectedValue(value)}
      />
    </>
  );
};
