import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsList from '../components/ProductsList/ProductsList';
import ProductDetails from '../components/ProductDetails/ProductDetails';

const ProductsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
    );
};

export default ProductsRouter;