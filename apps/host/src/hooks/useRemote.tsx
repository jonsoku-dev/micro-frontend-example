import { loadRemote, registerRemotes } from '@module-federation/runtime';
import { lazy, Suspense, type ComponentType } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export type RemoteDetails = {
  scope: string;
  module: string;
}

export async function loadRemoteFromService(scope: string) {
  const remoteMap: Record<string, string> = {
    'products': 'http://localhost:4201/mf-manifest.json'
  };
  return Promise.resolve(remoteMap[scope]);
}

export default function useRemote<T = unknown>({ module, scope }: RemoteDetails): T {
  const LazyComponent = lazy(async () => {
    const remoteUrl = await loadRemoteFromService(scope);
    registerRemotes([{
      name: scope,
      entry: remoteUrl
    }])

    return loadRemote<T>(`${scope}/${module}`) as unknown as Promise<{ default: ComponentType<T> }>;
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (props: any) => (
    <ErrorBoundary fallback={<div>Ut oh!</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}
