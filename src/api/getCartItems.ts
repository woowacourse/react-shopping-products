import fetchWithErrorHandling from './fetchWithErrorHandling';

const getCartItems = async () => {
  let newErrorMessage = '';

  const { data, status } = await fetchWithErrorHandling('cart-items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic RGFldW4tMTAwOnBhc3N3b3Jk',
    },
  });

  if (status === 400) {
    newErrorMessage = ' 장바구니를 불러오지 못했습니다. 다시 시도해주세요';
  } else if (status === 404) {
    newErrorMessage = 'not found';
  } else if (status === 500) {
    newErrorMessage = '서버에 문제가 발생했습니다.';
  }

  return { newErrorMessage, data };
};

export default getCartItems;
