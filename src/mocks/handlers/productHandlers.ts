import { http, HttpResponse } from 'msw';
import { mockProducts, mockProductStock } from '../data/mockProducts';
import { ProductType } from '../../types/product';

const API_URL = 'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com';

type SortOrder = 'asc' | 'desc';

const sortProducts = (products: ProductType[], sortKey: string, sortOrder: SortOrder): ProductType[] => {
  return [...products].sort((a, b) => {
    if (sortKey === 'price') {
      const diff = a.price - b.price;
      return sortOrder === 'asc' ? diff : -diff;
    } else if (sortKey === 'name') {
      const diff = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? diff : -diff;
    } else if (sortKey === 'id') {
      const diff = a.id - b.id;
      return sortOrder === 'asc' ? diff : -diff;
    }
    return 0;
  });
};

export const productHandlers = [
  http.get(`${API_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '20';
    const sortParams = url.searchParams.getAll('sort');

    let filteredProducts = [...mockProducts];

    // 카테고리 필터링
    if (category && category !== '전체') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    // 정렬 처리 (price,asc & id,desc)
    if (sortParams.length > 0) {
      // 첫 번째 정렬 기준 (price)
      const primarySort = sortParams[0];
      if (primarySort) {
        const [sortKey, sortOrder] = primarySort.split(',') as [string, SortOrder];
        filteredProducts = sortProducts(filteredProducts, sortKey, sortOrder);

        // 두 번째 정렬 기준 (id) - 가격이 같을 때 id로 정렬
        if (sortParams[1]) {
          const [, secondarySortOrder] = sortParams[1].split(',') as [string, SortOrder];
          // 가격이 같은 그룹들을 id로 정렬
          const priceGroups = new Map<number, ProductType[]>();
          filteredProducts.forEach(product => {
            const group = priceGroups.get(product.price) || [];
            group.push(product);
            priceGroups.set(product.price, group);
          });

          filteredProducts = [];
          priceGroups.forEach((group) => {
            if (group.length > 1) {
              group.sort((a, b) => {
                const diff = a.id - b.id;
                return secondarySortOrder === 'asc' ? diff : -diff;
              });
            }
            filteredProducts.push(...group);
          });
        }
      }
    }

    // 페이지네이션
    const startIndex = Number(page) * Number(size);
    const endIndex = startIndex + Number(size);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // quantity(재고) 정보 추가 - README의 미구현 API 스펙에 따라
    const productsWithStock = paginatedProducts.map(product => ({
      ...product,
      quantity: mockProductStock[product.id] || 0
    }));

    const response = {
      content: productsWithStock,
      pageable: {
        sort: {
          empty: sortParams.length === 0,
          sorted: sortParams.length > 0,
          unsorted: sortParams.length === 0
        },
        offset: startIndex,
        pageNumber: Number(page),
        pageSize: Number(size),
        paged: true,
        unpaged: false
      },
      last: endIndex >= filteredProducts.length,
      totalElements: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / Number(size)),
      first: Number(page) === 0,
      size: Number(size),
      number: Number(page),
      sort: {
        empty: sortParams.length === 0,
        sorted: sortParams.length > 0,
        unsorted: sortParams.length === 0
      },
      numberOfElements: paginatedProducts.length,
      empty: paginatedProducts.length === 0
    };

    return HttpResponse.json(response);
  }),

  // GET /products/:id - 개별 상품 조회 (README의 미구현 API 스펙)
  http.get(`${API_URL}/products/:id`, ({ params }) => {
    const id = Number(params.id);
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return HttpResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // quantity 필드 추가 - README의 미구현 API 스펙에 따라
    return HttpResponse.json({
      ...product,
      quantity: mockProductStock[product.id] || 0
    });
  })
];
