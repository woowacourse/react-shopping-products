import { css } from '@emotion/react';

import { AppLayout } from '@/shared/components/AppLayout';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Loading } from '@/shared/components/Loading';
import { Text } from '@/shared/components/Text';

import { Select } from '../../../shared/components/Select/index';
import { ProductItem } from '../components/ProductItem';
import { ShoppingBag } from '../components/ShoppingBag';
import { CATEGORY, SORT_ORDER } from '../constants/product';
import { ProductListContainer } from '../container/ProductListContainer';
import { useShopping } from '../hooks/useShopping';

export const ProductListPage = () => {
  const {
    cartData,
    filteredData,
    isLoading,
    toggleCartItem,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useShopping();

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
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          gap="0px"
          width="100%"
        >
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
            gap="0px"
            padding="10px 25px"
          >
            <Select maxWidth={100} selectedOptions={categorySelect}>
              {Object.entries(CATEGORY).map(([_, value], idx) => (
                <Select.Option key={idx} option={value} onSelectOption={handleCategorySelect}>
                  {value}
                </Select.Option>
              ))}
            </Select>
            <Select
              maxWidth={125}
              selectedOptions={SORT_ORDER[priceSelect as keyof typeof SORT_ORDER]}
            >
              {Object.entries(SORT_ORDER).map(([key, value], idx) => (
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
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="0px"
            css={css`
              flex: 1;
            `}
          >
            {isLoading ? (
              <Flex
                direction="column"
                gap="0px"
                justifyContent="center"
                alignItems="center"
                css={css`
                  width: 100%;
                  height: 600px;
                `}
              >
                <Loading size="xl" />
              </Flex>
            ) : (
              <ProductListContainer>
                {filteredData.map((item) => (
                  <ProductItem
                    key={item.id}
                    isChecked={item.isChecked}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onCartUpdate={() => toggleCartItem(item.id)}
                  />
                ))}
              </ProductListContainer>
            )}
          </Flex>
        </Flex>
      </AppLayout>
    </>
  );
};
