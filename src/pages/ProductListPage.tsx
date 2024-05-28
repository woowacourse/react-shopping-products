import { useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Header from '../components/Header/Header';

const ProductListPage = () => {
  const optionList = ['패션', '전자', '책'];

  const [selectedOption, setSelectedOption] = useState(optionList[0]);

  const handleSelectedOption = (option: string) => setSelectedOption(option);

  return (
    <div>
      <Header />
      <Dropdown options={optionList} selectedOption={selectedOption} updateOption={handleSelectedOption} />
      <p>프로덕트 리스트 페이지</p>
      <div>bpple 상품 목록</div>
    </div>
  );
};

export default ProductListPage;
