import { ModuleFederationConfig } from '@nx/module-federation';

const sharedLibraries = ['react', 'react-dom'];

const config: ModuleFederationConfig = {
  name: 'host',
  // remotes: [['products', 'products@http://localhost:4201/mf-manifest.json']],
  shared: (libraryName, sharedConfig) => {
    if (!sharedLibraries.includes(libraryName)) {
      return false;
    }
  },
};

export default config;
