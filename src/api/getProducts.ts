const getProducts = async () => {
  const response = await fetch(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products',
    { method: 'GET' }
  );

  const data = await response.json();
  return data;
};

export default getProducts;
