import { HttpResponse, http } from 'msw';
import fullProductList from './products.json';
import { ENV } from '@/api/env';

const baseUrl = ENV.BASE_URL;

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export const handlers = [
  http.get(`${baseUrl}products`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const sort = url.searchParams.get('sort') || '';
    const category = url.searchParams.get('category') || '';

    // ✅ 실제 products 배열은 content 필드 안에 있음
    let filtered = [...fullProductList.content];

    // ✅ category 필터
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    const allowedSortKeys: (keyof Product)[] = ['price', 'id'];

    // ✅ sort (예: price,asc)
    if (sort) {
      const [key, direction] = sort.split(',') as [keyof Product, 'asc' | 'desc'];

      if (allowedSortKeys.includes(key)) {
        filtered.sort((a, b) =>
          direction === 'desc' ? (b[key]! > a[key]! ? 1 : -1) : a[key]! > b[key]! ? 1 : -1
        );
      }
    }

    // ✅ pagination
    const paged = filtered.slice(page * size, (page + 1) * size);

    // ✅ 최종 응답 구성
    return HttpResponse.json({
      ...fullProductList,
      content: paged,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size,
      numberOfElements: paged.length,
      empty: paged.length === 0,
      first: page === 0,
      last: (page + 1) * size >= filtered.length,
    });
  }),
];
