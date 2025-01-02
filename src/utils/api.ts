import axios from "axios";

export const fetchProducts = async (): Promise<any> => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data; // Contains the array of products
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      return response.data; // Contains the product data
    } catch (error) {
      console.error(`Failed to fetch product with ID ${id}:`, error);
      throw error;
    }
  };

  export const searchProducts = async (query: string): Promise<any> => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search`, {
        params: { q: query },
      });
      return response.data; // Contains the search results
    } catch (error) {
      console.error(`Failed to search products with query "${query}":`, error);
      throw error;
    }
  };