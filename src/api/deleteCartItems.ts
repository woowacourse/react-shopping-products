const deleteCartItems = async (cartItemId: number) => {
  const response = await fetch(
    ` http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/${cartItemId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic RGFldW4tMTAwOnBhc3N3b3Jk',
      },

    }
  );
  console.log(cartItemId)
}

export default deleteCartItems;