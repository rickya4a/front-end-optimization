import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import Link from 'next/link';
import { Card } from 'flowbite-react';
import Image from 'next/image';

interface Product {
  thumbnail: string;
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ITEMS_PER_PAGE = 9;

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(category, sort);
      setProducts(
        data.products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      );
      setTotalPages(Math.ceil(data.products.length / ITEMS_PER_PAGE));
      setLoading(false);
    };
    loadProducts();
  }, [category, sort, page]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h1>Products</h1>
      <div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value=''>All Categories</option>
          <option value='smartphones'>Smartphones</option>
          <option value='laptops'>Laptops</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value=''>Sort by</option>
          <option value='asc'>Price Ascending</option>
          <option value='desc'>Price Descending</option>
        </select>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((product) => (
          <>
            <Card
              className='max-w-sm mx-auto'
              imgAlt={product.title}
              renderImage={() => (
                <Image
                  loading='lazy'
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={200}
                />
              )}>
              <a href='#'>
                <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                  {product.title}
                </h5>
              </a>
              <div className='flex items-center justify-between'>
                <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                  ${product.price}
                </span>
                <Link
                  href={`/product/${product.id}`}
                  className='rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
                >View Details</Link>
              </div>
            </Card>
          </>
        ))}
      </div>

      <div>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button key={idx} onClick={() => setPage(idx + 1)}>
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
