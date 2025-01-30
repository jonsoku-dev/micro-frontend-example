import { PropsWithChildren, useEffect } from 'react';
import { logger } from '@custom-mfe/logger';
import User from './app/user';
import { useQuery } from '@tanstack/react-query';

export default function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    return logger.subscribe((event) => {
      console.log('Host Event Received: ', event.message);
    });
  }, []);

  return (
    <>
      <nav
        style={{
          background: 'rgb(36, 36, 36)',
          padding: '1rem',
          color: '#fff',
        }}
      >
        <User />
      </nav>
      {children}
    </>
  );
}
