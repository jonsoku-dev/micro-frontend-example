import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

type ModuleFederationConfig = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

const config: ModuleFederationConfig = {
  name: 'products',
  filename: 'remoteEntry.js',
  experiments: {
    federationRuntime: 'hoisted',
    externalRuntime: true
},
  exposes: {
    './Types': './src/types.d.ts',
    './ProductsList': './src/components/ProductsList/ProductsList.tsx',
    './useTest': './src/components/hooks/useTest.ts',
    './ProductsRouter': './src/components/ProductsRouter.tsx',
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
