import {
  ShoppingListFilterItemStyle,
  ShoppingListFilterStyle,
  ShoppingListStyle,
  ShoppingListTitleStyle,
} from './ShoppingList.styles';
import Text from '../../component/@common/Text/Text';
import Dropdown from '../../component/@common/Dropdown/Dropdown';
import ArrowIcon from '../../component/@common/ArrowIcon/ArrowIcon';
import ErrorFallback from '../../component/@common/ErrorFallback/ErrorFallback';

import { CategoryOption, SortOption } from '../../types/common';
import useShoppingItemList from '../../hook/useShoppingItemList';
import ProductList from '../../component/feature/ProductList/ProductList';

const categoryOptions: CategoryOption[] = ['전체', '패션잡화', '식료품'];
const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

const ShoppingList = () => {
  const {
    data,
    selectSort,
    selectCategory,
    sortType,
    category,
    error,
    isLoading,
    retryFetch,
  } = useShoppingItemList();

  // 에러가 있을 경우 ErrorFallback 표시
  if (error) {
    return (
      <>
        <ErrorFallback
          error={error}
          onRetryClick={retryFetch}
          message="상품 목록을 불러오는데 실패했습니다"
        />
      </>
    );
  }

  return (
    <>
      <section css={ShoppingListStyle}>
        <div css={ShoppingListTitleStyle}>
          <Text variant="title">bpple 상품 목록</Text>
          <div css={ShoppingListFilterStyle}>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {category}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {categoryOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={selectCategory}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
            <div css={ShoppingListFilterItemStyle}>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  {sortType}
                  <ArrowIcon />
                </Dropdown.Trigger>
                <Dropdown.List>
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option}
                      handleClick={selectSort}
                      content={option}
                    />
                  ))}
                </Dropdown.List>
              </Dropdown.Root>
            </div>
          </div>
        </div>
      </section>
      <ProductList data={data} isLoading={isLoading} />
    </>
  );
};

export default ShoppingList;
