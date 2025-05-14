export const getProducts = async () => {
  try {
    const response = await fetch(
      'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?page=0&size=10'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
