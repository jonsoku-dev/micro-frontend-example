import { Route, Routes } from 'react-router-dom';
import { CartPage } from './cart-page';

export default function CartRouter() {
  return (
    <Routes>
      <Route path="/" element={<CartPage />} />
    </Routes>
  );
}
