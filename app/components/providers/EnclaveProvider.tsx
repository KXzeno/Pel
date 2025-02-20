'use client';

import React from 'react';

type ContextData = {
  loadedModules: object;
  updateModules: React.Dispatch<React.SetStateAction<object>>;
}
export const EnclaveContext: React.Context<ContextData> = React.createContext({
  loadedModules: {},
  // FIXME: Find better way of asserting Context type
  updateModules: (() => null) as React.Dispatch<React.SetStateAction<object>>,
   
});

export default function Enclave({ children }: { children: React.ReactNode }): React.ReactNode {
  // TODO: Assign this to user data when auth is set up
  const defaultData = {
    E1: {
      '1C1': {
        data: {},
        T1: { data:{}, },
        '2C1:1': { data: {}, T1: { data: {}, }, T2: { data: {}, }, },
        '2C2:1': { data:{}, T1: { data: {}, }, '3C1:2': { data: {}, }, },
      }
    }
  }

  const [loadedModules, updateModules] = React.useState<object>(defaultData);
  updateModules

  return (
    <EnclaveContext.Provider value={{
      loadedModules, 
      updateModules
      }}>
      { children }
    </EnclaveContext.Provider>
  );
}
