import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductById } from '../../utils/api';
import Image from 'next/image';

interface Product {
  thumbnail: string;
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        const data = await fetchProductById(parseInt(id as string));
        setProduct(data);
      };
      loadProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className='container mx-auto'>
      <h1>{product.title}</h1>
      <div>
        <Image
          src={product.images[currentImage]}
          alt={product.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <div>
          {product.images.map((image, index) => (
            <button
              className='border-2 border-blue-200 rounded'
              key={index}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt={product.title}
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
      </div>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>
        {product.stock > 0 ? <span>In Stock</span> : <span>Out of Stock</span>}
      </p>
    </div>
  );
};

export default ProductPage;
