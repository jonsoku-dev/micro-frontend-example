import { composePlugins, withNx, withReact } from '@nx/rspack';
import mfConfig from './module-federation.config';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import * as path from 'path';

export default composePlugins(withNx(), withReact(), (config, ctx) => {
  const isDevelopment = config.mode === 'development';

  config.plugins?.push(new ModuleFederationPlugin(mfConfig));

  config.output = {
    ...config.output,
    publicPath: 'auto',
  };

  if (isDevelopment) {
    config.devServer = {
      host: '127.0.0.1',
      hot: true,
      liveReload: false,
      watchFiles: {
        paths: ['src/**/*'],
        options: {
          usePolling: false,
        },
      },
    };

    config.optimization = {
      ...config.optimization,
      moduleIds: 'named',
      chunkIds: 'named',
      minimize: false,
    };
  } else {
    // Production 설정
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
  }

  config.resolve = {
    ...(config.resolve ?? {}),
    alias: {
      ...(config.resolve?.alias ?? {}),
      '@custom-mfe/logger': path.resolve(
        ctx.context.root,
        'dist/packages/logger'
      ),
      '@custom-mfe/store': path.resolve(
        ctx.context.root,
        'dist/packages/store'
      ),
    },
  };

  return config;
});
