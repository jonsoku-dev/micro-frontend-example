import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';
import { Shared, ShareScopeMap } from '@module-federation/runtime/types';

interface SimplifiedShare {
  [pkgName: string]: {
    version: string;
    usedIn: string[];
    from: string;
  };
}

function simplifyShareScope(shareScope: ShareScopeMap['']): SimplifiedShare {
  return Object.entries(shareScope).reduce((acc, [packageName, versions]) => {
    const [version, details] = Object.entries(versions)[0];
    const shared = details as unknown as Shared;
    acc[packageName] = {
      version,
      usedIn: shared.useIn,
      from: shared.from,
    };
    return acc;
  }, {} as SimplifiedShare);
}

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'dynamic-remote',
    beforeInit(args) {
      console.debug('beforeInit: ', args);
      return args;
    },
    beforeRequest(args) {
      const { id, options } = args;
      console.debug('beforeRequest: ', args);

      const remote = options.remotes.find((remote) => remote.name === id);

      if (!remote) {
        return args;
      }

      // @ts-expect-error
      remote.entry = 'http://localhost:4201/mf-manifest.json';

      return args;
    },
    afterResolve(args) {
      console.debug('afterResolve', args);
      return args;
    },
    onLoad(args) {
      const { options } = args;
      console.debug('onLoad: ', args);
      const shareScope = options.host.shareScopeMap['default'];
      const simplified = simplifyShareScope(shareScope);
      console.log(simplified);
      return args;
    },
    async loadShare(args) {
      console.debug('loadShare:', args);
    },
    async beforeLoadShare(args) {
      console.debug('beforeloadShare:', args);
      return args;
    },
  };
};
export default runtimePlugin;
