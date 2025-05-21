import { CLIENT_ERROR_MESSAGE } from '../constants/errorMessages';

const validateCartInCount = (cartInCount: number, productQuantity: number) => {
  if (cartInCount > productQuantity) {
    throw new Error(CLIENT_ERROR_MESSAGE.OUT_OF_STOCK);
  }
};

export default validateCartInCount;
