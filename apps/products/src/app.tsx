import Button from './components/remote-button';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <>
      <p>이것은 remote component 입니다.</p>
      <Button />
    </>
  </StrictMode>
);
