'use client';

import React from 'react';

import '../main/styles/Sample.css';

  // TODO: Assign this to user data when auth is set up
import { defaultData, type EnclaveData } from '@/utils/DefaultEnclaveData';

type ContextData = {
  loadedModules: object;
  updateModules: React.Dispatch<React.SetStateAction<EnclaveData[]>>;
}

export const EnclaveContext: React.Context<ContextData> = React.createContext({
  loadedModules: {},
  // FIXME: Find better way of asserting Context type
  updateModules: (() => null) as React.Dispatch<React.SetStateAction<EnclaveData[]>>,
});

export default function Enclave(): React.ReactNode {
  const [loadedModules, updateModules] = React.useState<EnclaveData[]>(defaultData);
  const [moduleAdderInput, setModuleAdderInput] = React.useState<string>('');

  return (
    <EnclaveContext.Provider value={{
      loadedModules, 
      updateModules
      }}>
      <div>
        <ul>
        {loadedModules.map(mod => {
          return (
            <li key={mod.id}>
              {mod.name}
            </li>
          );
        })}
        </ul>
        <button type='button' id='module-adder'>
          +
        </button>
        <input 
          type="text"
          id='module-adder-input' 
          value={moduleAdderInput}
          onChange={(e) => setModuleAdderInput(e.target.value)}
          placeholder=' Enter enclave name' 
        />
      </div>
    </EnclaveContext.Provider>
  );
}
