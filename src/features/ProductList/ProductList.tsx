import { useCallback } from 'react';
import { css } from '@emotion/react';

import { AppLayout } from '@/shared/components/AppLayout';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

import { ProductItem } from './components/ProductItem';
import { ShoppingBag } from './components/ShoppingBag';
import { CATEGORY, PRICE } from './constants/product';
import { ProductListContainer } from './container/ProductListContainer';
import { useShopping } from './hooks/useShopping';

import { Select } from '../../shared/components/Select/index';

export const ProductList = () => {
  const {
    cartData,
    filteredData,
    isLoading,
    addToCart,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useShopping();

  const handleAddCartClick = useCallback(
    async (id: number) => {
      await addToCart(id, 1);
    },
    [addToCart]
  );

  return (
    <>
      <AppLayout>
        <Header
          left={
            <Text
              type="Heading"
              weight="semibold"
              color="white"
              css={css`
                cursor: pointer;
              `}
            >
              SHOP
            </Text>
          }
          right={<ShoppingBag count={cartData.length} />}
        />
        <Flex direction="column" justifyContent="space-between" alignItems="flex-start" gap="0px">
          <Text
            type="Heading"
            css={css`
              padding: 15px 25px 10px 25px;
            `}
          >
            상품목록
          </Text>
          <Flex
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="10px 25px"
            flex={0.4}
          >
            <Select maxWidth={100} selectedOptions={categorySelect}>
              {Object.entries(CATEGORY).map(([key, value], idx) => (
                <Select.Option key={idx} option={value} onSelectOption={handleCategorySelect}>
                  {value}
                </Select.Option>
              ))}
            </Select>

            <Select maxWidth={125} selectedOptions={PRICE[priceSelect as keyof typeof PRICE]}>
              {Object.entries(PRICE).map(([key, value], idx) => (
                <Select.Option
                  key={idx}
                  option={value}
                  onSelectOption={() => handlePriceSelect(key)}
                >
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Flex>

          <ProductListContainer>
            {filteredData.map((item) => (
              <ProductItem
                key={item.id}
                id={item.id}
                isChecked={item.isChecked}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onCartUpdate={() => handleAddCartClick(item.id)}
              />
            ))}
          </ProductListContainer>
        </Flex>
      </AppLayout>
    </>
  );
};
