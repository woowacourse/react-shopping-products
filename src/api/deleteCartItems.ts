import safeFetch from './safeFetch';

const deleteCartItems = async (cartItemId: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data, status } = await safeFetch(`cart-items/${cartItemId}`, options);

  return { data, status };

  // if (status === 400) {
  //   newErrorMessage =
  //     '장바구니에서 상품을 삭제하지 못했습니다. 다시 시도해주세요';
  // } else if (status === 404) {
  //   newErrorMessage = 'not found';
  // } else if (status === 500) {
  //   newErrorMessage = '서버에 문제가 발생했습니다.';
  // }

  // return { data, newErrorMessage };
};

export default deleteCartItems;
