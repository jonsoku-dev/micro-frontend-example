import React from 'react';
import styles from './remote-button.module.css';

export default function RemoteButton() {
  const [count, setCount] = React.useState(0);

  return (
    <div className={styles["button"]}>
      <button className='bg-red-300' type="button" onClick={() => setCount(count + 1)}>
        Remote Button
      </button>
      <div>Count: {count}</div>
    </div>
  );
}
