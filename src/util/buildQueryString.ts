const buildQueryString = (params: Record<string, string>, excludedValues: string[]) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== ' ' && value && !excludedValues.includes(value)) {
      searchParams.append(key, value);
    }
  });
  return `?${searchParams.toString()}`;
};

export default buildQueryString;
