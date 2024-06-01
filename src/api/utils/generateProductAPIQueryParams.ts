type QueryParams = {
  page: number;
  keyword?: string;
  category?: string;
  size?: number;
  sortType?: string;
};

const generateProductAPIQueryParams = ({
  page,
  keyword = '',
  category = '',
  size,
  sortType,
}: QueryParams) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (keyword) params.append('keyword', keyword);
  if (category && category !== 'all') params.append('category', category);
  if (size) params.append('size', size.toString());
  if (sortType) params.append('sort', sortType);
  return `?${params.toString()}`;
};

export default generateProductAPIQueryParams;
