import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductsList.module.css';
import { logger } from '@custom-mfe/logger';
import {
  useContextProfile,
  useProfile,
  useStoreProfile,
} from '@custom-mfe/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Components } from '@custom-mfe/components';

interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    description: 'Modern smartwatch with health tracking features',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: 3,
    title: 'Digital Camera',
    description: 'Professional digital camera for photography enthusiasts',
    imageUrl:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
  },
  {
    id: 4,
    title: 'Laptop',
    description: 'Powerful laptop for work and entertainment',
    imageUrl:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
  },
];

const ProductsList: React.FC = () => {
  const { data } = useProfile();
  const { get } = useStoreProfile();
  const { profile: contextProfile } = useContextProfile();

  const profile = get();

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        <div>{JSON.stringify(data)}</div>
        <Components />
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={styles.productCard}
            onMouseEnter={() => {
              logger.logInfo(`You viewed ${product.title}`);
            }}
          >
            <div className={styles.imageContainer}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productDescription}>{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const ProductsListWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsList />
    </QueryClientProvider>
  );
};

export default ProductsListWrapper;
