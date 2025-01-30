import useRemote from '../hooks/useRemote';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RemoteButtonType from 'products/RemoteButton';

export function App() {
  const RemoteButton = useRemote<typeof RemoteButtonType>({ scope: 'products', module: 'RemoteButton' });

  console.log({ RemoteButton })

  return (
    <div>
      Hi I'm host
      <RemoteButton />
    </div>
  );
}

export default App;
