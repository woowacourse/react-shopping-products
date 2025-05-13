import { Product } from '../App';

const  postCartItems = (product: Product) => {
  const body = JSON.stringify({
    productId: product.id,
    quantity: 1,
  });

  fetch(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic RGFldW4tMTAwOnBhc3N3b3Jk',
      },
      body,
    }
  );
};

export default postCartItems;
