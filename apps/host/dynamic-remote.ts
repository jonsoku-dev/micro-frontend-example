import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

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

      if(!remote) {
        return args;
      }

      // @ts-expect-error
      remote.entry = "http://localhost:4201/mf-manifest.json";

      return args;
    },
    afterResolve(args) {
      console.debug('afterResolve', args);
      return args;
    },
    onLoad(args) {
      console.debug('onLoad: ', args);
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
