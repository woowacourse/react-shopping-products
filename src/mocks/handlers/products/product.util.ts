import { Product } from '@appTypes/product';

export const getSortingFunc = (sortStandard: string, sortOrder: string) => {
  if (sortStandard !== 'id' && sortStandard !== 'name' && sortStandard !== 'price') return () => 0;
  if (sortOrder !== 'asc' && sortOrder !== 'desc') return () => 0;
  if (sortStandard === 'name')
    return (aProduct: Product, bProduct: Product) =>
      aProduct[sortStandard].localeCompare(bProduct.name) * (sortOrder === 'asc' ? 1 : -1);

  return (aProduct: Product, bProduct: Product) =>
    (aProduct[sortStandard] - bProduct[sortStandard]) * (sortOrder === 'asc' ? 1 : -1);
};

export const getQueryByURL = (url: URL) => {
  const page = Number(url.searchParams.get('page') || '0');
  const size = Number(url.searchParams.get('size') || '20');
  const sortParam = url.searchParams.get('sort')?.split(',') ?? ['id', 'desc'];

  const category = url.searchParams.get('category') ?? '';

  const sortStandard = sortParam[0] ?? 'id';
  const sortOrder = sortParam[1] ?? 'desc';

  return { page, size, category, sortStandard, sortOrder };
};

export const getPage = <T>(array: T[], pageSize: number, page: number) => {
  const start = page * pageSize;
  const end = (page + 1) * pageSize;

  const last = array.length <= end;
  const paginatedPage = array.slice(start, end);

  return { paginatedPage, last };
};
