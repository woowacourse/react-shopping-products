interface Query {
  sortValue: string;
}

export const getProducts = async ({ sortValue }: Query) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products?sort=${sortValue}`);
    if (!response.ok) {
      throw new Error('Network response was not ok for getProducts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
