/* eslint-disable @typescript-eslint/ban-ts-comment */

import { lazy, useEffect } from "react";
import useRemote from "../hooks/useRemote";
import styles from './app.module.css';
// @ts-expect-error
import type ProductsListType from 'products/ProductsList';
// @ts-expect-error
import type useTest from 'products/useTest';
import { loadRemote } from "@module-federation/runtime";

export function App() {
  const RemoteProductsRouter = useRemote<typeof ProductsListType>({ scope: 'products', module: 'ProductsRouter' });

  // Potential race condition with registerRemote call in "useRemote"
  // You must register the remote reliabily before this can be used without error.
  // useEffect(() => {
  //   async function doStuff() {
  //     const testHookModule = await loadRemote('products/useTest');
  //     console.log(testHookModule);
  //     //@ts-expect-error
  //     const testHook = testHookModule.default as typeof useTest;
  //     console.log('Test hook', testHook());
  //   }

  //   doStuff();
  // }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MFE Demo Store</h1>
        <p className={styles.description}>
          Welcome to our demo store powered by Micro Frontends. Browse through our selection of products
          loaded dynamically from a remote application.
        </p>
      </header>
      <main className={styles.content}>
        <div>
          <RemoteProductsRouter />
        </div>
      </main>
    </div>
  );
}

export default App;
