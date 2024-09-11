export const fetchProducts = async (category: string = '', sort: string = '') => {
  let url = `https://dummyjson.com/products`;

  if (category) {
    url += `/category/${category}`;
  }

  if (sort) {
    url += `?sortBy=title&order=${sort}`;
  }

  const res = await fetch(url);
  return await res.json();
};

export const fetchProductById = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await res.json();
};