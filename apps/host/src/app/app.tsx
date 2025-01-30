import '../styles.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import RemoteButton from 'products/RemoteButton';

export function App() {
  return (
    <div>
      Hi I'm host
      <RemoteButton />
    </div>
  );
}

export default App;
