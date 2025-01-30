import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import ProductsList from './components/ProductsList/ProductsList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <>
      <p>You are running in the remote.</p>
      <ProductsList />
    </>
  </StrictMode>
);
