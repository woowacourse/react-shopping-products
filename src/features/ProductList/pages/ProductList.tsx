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
import { Modal } from '@/shared/components/Modal';
import { useContext, useState } from 'react';
import PriceSummary from '../components/PriceSummary';
import { APIContext } from '@/shared/context/APIContext';

export const ProductListPage = () => {
  const { data } = useContext(APIContext);
  const cartData = Object.values(data['cartItem'] ?? {});
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const {
    filteredData,
    isLoading,
    addCartItem,
    updateCartQuantity,
    deleteFromCart,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useShopping();

  const cartTotalPrice = cartData.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

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
          right={<ShoppingBag handleShowModal={handleShowModal} />}
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
                {filteredData.map((item) => {
                  const cartItem = cartData.find((cartItem) => cartItem.product.id === item.id);

                  return (
                    <ProductItem
                      key={item.id}
                      isChecked={item.isChecked}
                      name={item.name}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      quantity={item.quantity}
                      cartCount={cartItem?.quantity || 0}
                      onAddCart={() => addCartItem(item.id)}
                      onIncrease={() =>
                        cartItem && updateCartQuantity(cartItem.id, +1, cartItem.quantity)
                      }
                      onDecrease={() =>
                        cartItem && updateCartQuantity(cartItem.id, -1, cartItem.quantity)
                      }
                    />
                  );
                })}
              </ProductListContainer>
            )}
          </Flex>
          <Modal show={showModal} onHide={handleShowModal} position="bottom">
            <Modal.Header>
              <Modal.Title>장바구니</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {filteredData.filter((item) => item.isChecked).length === 0 ? (
                <Text type="Body" weight="medium" color="gray">
                  장바구니가 비었습니다.
                </Text>
              ) : (
                filteredData
                  .filter((item) => item.isChecked)
                  .map((item) => {
                    const cartItem = cartData.find((cartItem) => cartItem.product.id === item.id);

                    return (
                      <ProductItem
                        key={item.id}
                        isChecked={item.isChecked}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        quantity={item.quantity}
                        cartCount={cartItem?.quantity || 0}
                        onAddCart={() => addCartItem(item.id)}
                        onIncrease={() =>
                          cartItem && updateCartQuantity(cartItem.id, +1, cartItem.quantity)
                        }
                        onDecrease={() =>
                          cartItem && updateCartQuantity(cartItem.id, -1, cartItem.quantity)
                        }
                        onDelete={() => cartItem && deleteFromCart(cartItem.id)}
                        variant="modal"
                      />
                    );
                  })
              )}
            </Modal.Body>
            <Modal.Footer buttonAlign="center">
              <PriceSummary label="총 결제 금액" amount={cartTotalPrice} />
              <Modal.CancelButton onClick={handleShowModal} width="100%">
                닫기
              </Modal.CancelButton>
            </Modal.Footer>
          </Modal>
        </Flex>
      </AppLayout>
    </>
  );
};
