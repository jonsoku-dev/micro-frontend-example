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
  },

  shared: ['react', 'react-dom'],
};
export default config;
