import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

type ModuleFederationConfig = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

const config: ModuleFederationConfig = {
  name: 'products',
  filename: 'remoteEntry.js',
  exposes: {
    './Types': './src/types.d.ts',
    './RemoteButton': './src/components/remote-button.tsx',
    './ProductsList': './src/components/ProductsList/ProductsList.tsx',
    './useTest': './src/hooks/useTest.ts',
  },

  shared: ['react', 'react-dom'],
};
export default config;
