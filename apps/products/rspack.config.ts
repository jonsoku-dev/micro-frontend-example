import { composePlugins, withNx, withReact } from '@nx/rspack';
import mfConfig from './module-federation.config';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

module.exports = composePlugins(withNx(), withReact(), (config, ctx) => {
  config.plugins?.push(new ModuleFederationPlugin(mfConfig));

  config.output = {
    ...config.output,
    publicPath: 'auto', // runtime 환경에서는 모듈에 접두사가 없으므로 auto를 권장한다.
  };

  // 기본적으로 rspack은 IPV4로 기본값을 받고 사용할 수 없는 경우 IPV6로 전환한다.
  // 호스트를 루프백 어댑터로 명시적으로 설정하려면 다음과 같이 설정한다.
  config.devServer = {
    ...config.devServer,
    host: '127.0.0.1',
  };

  return config;
});
