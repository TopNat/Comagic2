import { createStore, Store } from "./store";
import React, { ReactNode } from "react";
import { useLocalObservable } from "mobx-react";

const StoreContext = React.createContext<Store | null>(null);
export const DataStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useLocalObservable(createStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useDataStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
