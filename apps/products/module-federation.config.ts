import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'products',
  exposes: {
    './RemoteButton': './src/components/remote-button.tsx',
  },
};

export default config;
