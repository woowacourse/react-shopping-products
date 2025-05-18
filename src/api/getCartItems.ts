import safeFetch from './safeFetch';

const getCartItems = async () => {
  const { data, status } = await safeFetch('cart-items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { data, status };
};

export default getCartItems;
