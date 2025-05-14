type PageableType = {
  page: number;
  size: number;
  sort?: string;
};

const PAGEABLE_DEFAULT = {
  page: 0,
  size: 20,
  sort: '',
};

export default async function getProducts(
  category?: '식료품' | '패션잡화',
  pageable: PageableType = PAGEABLE_DEFAULT
) {
  const { page, size, sort } = pageable;
  const response = await fetch(
    `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products?category=${category}&page=${page}&size=${size}&sort=${sort}`
  );

  if (!response.ok) {
    throw new Error('에러 발생');
  }

  const data = await response.json();

  return data;
}
