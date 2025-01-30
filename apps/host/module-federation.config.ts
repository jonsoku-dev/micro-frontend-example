import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

type ModuleFederationConfig = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

const config: ModuleFederationConfig = {
  name: 'host',
  filename: 'remoteEntry.js',
  shared: ['react', 'react-dom'],
};

export default config;
