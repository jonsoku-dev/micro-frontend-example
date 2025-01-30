/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy, useEffect } from "react";
import useRemote from "../hooks/useRemote";
import styles from './app.module.css';
//@ts-expect-error
import type ProductsListType from 'products/ProductsList';
//@ts-expect-error
import type useTest from 'products/useTest';
import { loadRemote } from "@module-federation/runtime";

export function App() {
  const RemoteProductsList = useRemote<typeof ProductsListType>({ scope: 'products', module: 'ProductsList' });

  useEffect(() => {
    async function doStuff() {
      const testHookModule = await loadRemote('products/useTest');
      console.log(testHookModule);
      //@ts-expect-error
      const testHook = testHookModule.default as typeof useTest;
      console.log('Test hook', testHook());
    }

    doStuff();
  }, []);

  return (
    <div>
      <p>Hi I'm the host.</p>
      <RemoteProductsList />
    </div>
  );
}

export default App;
