import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { logger } from '@custom-mfe/logger';

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
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
    },
    {
        id: 2,
        title: 'Smart Watch',
        description: 'Modern smartwatch with health tracking features',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
    },
    {
        id: 3,
        title: 'Digital Camera',
        description: 'Professional digital camera for photography enthusiasts',
        imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80'
    },
    {
        id: 4,
        title: 'Laptop',
        description: 'Powerful laptop for work and entertainment',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80'
    }
];

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = parseInt(id || '0', 10);

    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
        logger.logError(`Product with id ${productId} not found`);
        return <div className={styles.error}>Product not found</div>;
    }

    return (
        <div className={styles.container}>
            <div><Link to="/">Back</Link></div>
            <div className={styles.productDetails}>
                <div className={styles.imageContainer}>
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className={styles.productImage}
                    />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.description}>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
