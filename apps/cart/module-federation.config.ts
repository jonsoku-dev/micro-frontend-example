import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

type ModuleFederationConfig = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

const config: ModuleFederationConfig = {
  name: 'cart',
  filename: 'remoteEntry.js',
  experiments: {
    federationRuntime: 'hoisted',
    externalRuntime: true
  },
  exposes: {
    './Types': './src/types.d.ts',
    './CartRouter': './src/app/cart-router.tsx',
    './CartPage': './src/app/cart-page.tsx',
  },
  shared: {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
    '@tanstack/react-query': {
      singleton: true,
    },
    '@custom-mfe/store': {
      singleton: true,
    },
    'react-router-dom': {
      singleton: true,
    },
  },
};

export default config;
