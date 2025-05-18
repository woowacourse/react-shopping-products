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
};

export default deleteCartItems;
