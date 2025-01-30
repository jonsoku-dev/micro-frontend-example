import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import ProductsRouter from './components/ProductsRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ProductsRouter />
    </BrowserRouter>
  </StrictMode>
);
