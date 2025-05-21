import { CART_URL } from '../../constants/endpoint';
import { USER_TOKEN } from '../../constants/env';
import handleHttpError from '../handleHTTPError';

const removeCart = async (cartId: number) => {
  try {
    const response = await fetch(`${CART_URL}/${cartId}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
      method: 'DELETE',
    });
    console.log(response);

    await handleHttpError(response);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default removeCart;
