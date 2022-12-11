import { createContext } from "react";

interface Context {}

export const Context = createContext<Context>({} as Context);

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const state: Context = {};

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
