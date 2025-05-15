import ErrorToast from '../../components/ErrorToast';
import ProductItem from '../../components/ProductItem';
import { useEffect, useState } from 'react';
import Select from '../../components/Select';
import * as P from './ProductListPage.styles.tsx';
import { getProducts } from '../../services/productServices';
import { ProductItemType } from '../../types/data';
import tryApiCall from '../../util/tryApiCall';
import { addCartItems, removeCartItems } from '../../services/cartItemServices';
import { getCartId } from '../../domain/manageCartInfo';
import useCartContext from '../../hooks/useCartContext';
import {
  CATEGORY_OPTIONS,
  SELECT_SORT_OPTIONS,
  SORT_OPTIONS,
} from '../../constants/systemConstants';
import ProductListPageSkeleton from './ProductListPageSkeleton.tsx';

export const ProductListPage = () => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState('높은 가격순');
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const {
    cartItemsIds,
    handleAddCartItemsIds,
    handleRemoveCartItemsIds,
    errorMessage,
    handleErrorMessage,
  } = useCartContext();
  console.log(sortOption);
  useEffect(() => {
    (async () => {
      const productsData = await tryApiCall(
        () => getProducts(categoryOption, SORT_OPTIONS.get(sortOption)),
        handleErrorMessage,
      );
      if (productsData) {
        setProducts(productsData);
      }
      setIsLoading(false);
    })();
  }, [categoryOption, sortOption]);

  const handleCategoryOption = (value: string) => {
    setCategoryOption(value);
  };

  const handleSortOption = (value: string) => {
    setSortOption(value);
  };

  const handleAddCartItem = (id: number) => {
    const addItemInfo = {
      productId: id,
      quantity: 1,
    };
    (async () => {
      await tryApiCall(async () => await addCartItems(addItemInfo), handleErrorMessage);
      handleAddCartItemsIds(id);
    })();
  };

  const handleRemoveCartItem = (id: number) => {
    (async () => {
      await removeCartItems(await tryApiCall(async () => await getCartId(id), handleErrorMessage));
      handleRemoveCartItemsIds(id);
    })();
  };

  if (isLoading) {
    return <ProductListPageSkeleton />;
  }

  return (
    <P.ProductListPageContainer>
      {errorMessage.length !== 0 && <ErrorToast errorMessage={errorMessage} />}
      <P.Title>bpple 상품 목록</P.Title>
      <P.SelectContainer>
        <Select
          value={categoryOption}
          options={CATEGORY_OPTIONS}
          handleSelectedValue={(value) => handleCategoryOption(value)}
        />
        <Select
          value={sortOption}
          options={SELECT_SORT_OPTIONS}
          handleSelectedValue={(value) => handleSortOption(value)}
        />
      </P.SelectContainer>

      <P.ProductItemContainer>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isCartAdded={cartItemsIds.includes(product.id)}
            handleAddCartItem={handleAddCartItem}
            handleRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </P.ProductItemContainer>
    </P.ProductListPageContainer>
  );
};
