
import { Filtering} from '@appTypes/index';
import { Dropdown, IntersectionObserverArea, PageRequestError } from '@components/index';
import { CATEGORY_OPTIONS,PRICE_SORT_OPTIONS } from '@constants/index';
import {  useProductList} from '@hooks/index';
import {  useRef, useState } from 'react';

import ProductList from './ProductList';
import { ProductListPageSkeleton } from './Skeleton';
import style from './style.module.css';

function ProductListPage() {
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const {products,fetchNextPage, status,error} =useProductList(filtering)

  if(error) return <PageRequestError  error={error}/>;
  if(status ==='pending'|| !products) return <ProductListPageSkeleton />


  const runOnObserverTargetAppear =  () => {
    fetchNextPage();
  }

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  
  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" name="category" options={CATEGORY_OPTIONS} onChange={handleChangeOption} />
        <Dropdown label="가격순" name="sort" options={PRICE_SORT_OPTIONS} onChange={handleChangeOption} />
      </div>
        <ProductList products={products}>
          <IntersectionObserverArea targetRef={observerTargetRef} runOnObserverTargetAppear={runOnObserverTargetAppear}>
            <div className={style.observerTarget} ref={observerTargetRef}>
              <span>observer target</span>
            </div>
          </IntersectionObserverArea>
        </ProductList>
    </div>
  );
}

export default ProductListPage;
