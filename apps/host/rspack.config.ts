import { composePlugins, withNx, withReact } from '@nx/rspack';
import mfConfig from './module-federation.config';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import * as path from 'path';

export default composePlugins(withNx(), withReact(), (config, ctx) => {
  config.plugins?.push(new ModuleFederationPlugin(mfConfig));

  config.output = {
    ...config.output,
    publicPath: 'auto',
  };

  config.devServer = {
    ...config.devServer,
    host: '127.0.0.1',
    hot: true,
    liveReload: false, // HMR만 사용하고 전체 새로고침은 비활성화
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: false, // 파일 시스템 이벤트 사용
      },
    },
  };

  config.optimization = {
    ...config.optimization,
    moduleIds: 'named', // 개발 시 모듈 ID를 더 안정적으로 유지
  };

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
