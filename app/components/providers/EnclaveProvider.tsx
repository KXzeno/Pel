import React from 'react';

import '../main/styles/Sample.css';

import { 
  type ContextData,
  type ReducerState, 
  type ReducerAction,
} from '@main/types/Enclave.types';
import { defaultData } from '@utils/DefaultEnclaveData';
import enclaveReducer from '@utils/auxil/enclaveReducer';

// Create context w/ defaults
export const EnclaveContext: React.Context<ContextData> = React.createContext({
  // Defaults
  enclave: defaultData,
  dispatchEnclave: (() => null) as React.ActionDispatch<[ReducerAction]>,
});


/**
 * Enclave RFC; fetches user's notes and provides 
 * simple management for creating new enclave nodes
 */
export default function Enclave({ children }: { children: React.ReactNode }): React.ReactNode {
  const [enclave, dispatchEnclave] = React.useReducer<ReducerState, [ReducerAction]>(enclaveReducer, defaultData);
  return (
    <EnclaveContext.Provider value={{
      enclave,
      dispatchEnclave,
      }}>
      { children }
    </EnclaveContext.Provider>
  );
}
