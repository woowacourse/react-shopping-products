import safeFetch from './safeFetch';

const PatchCartItems = async (cartItemId: number, quantity: number) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity,
    }),
  };

  const { data, status } = await safeFetch(`cart-items/${cartItemId}`, options);

  return { data, status };
};

export default PatchCartItems;
