import { Product } from '../types/product.type';

const baseUrl = import.meta.env.VITE_BASE_URL;

async function fetchProducts(endpoint: string): Promise<Product[]> {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error('Error fetching products:' + error);
  }
}

export default fetchProducts;
