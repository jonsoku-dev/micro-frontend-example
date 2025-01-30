import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'custom-mfe',
  remotes: [['products', 'products@http://localhost:4201/remoteEntry.js']],
};

export default config;
