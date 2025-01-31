/* eslint-disable @typescript-eslint/ban-ts-comment */

import { lazy, useEffect } from 'react';
import useRemote from '../hooks/useRemote';
import styles from './app.module.css';
// @ts-expect-error
import type ProductsListType from 'products/ProductsList';
// @ts-expect-error
import type useTest from 'products/useTest';
import { loadRemote } from '@module-federation/runtime';
import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

type ProductsRouterType = React.ComponentType;
type CartRouterType = React.ComponentType;

export function App() {
  const ProductsRouter = useRemote<ProductsRouterType>({
    scope: 'products',
    module: 'ProductsRouter',
  });

  const CartRouter = useRemote<CartRouterType>({
    scope: 'cart',
    module: 'CartRouter',
  });

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">Micro Frontend Demo</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/*" element={<ProductsRouter />} />
            <Route path="/cart/*" element={<CartRouter />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
