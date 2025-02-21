'use client';

import React from 'react';

import '../main/styles/Sample.css';

  // TODO: Assign this to user data when auth is set up
import { defaultData, type EnclaveData } from '@/utils/DefaultEnclaveData';

type ContextData = {
  enclave: ReducerState;
  dispatchEnclave: React.ActionDispatch<[ReducerAction]>;
  
}

export const EnclaveContext: React.Context<ContextData> = React.createContext({
  // Defaults
  enclave: {} as ReducerState,
  dispatchEnclave: (() => null) as React.ActionDispatch<[ReducerAction]>,
});

enum DispatcherType {
  ModuleInput = 'INPUT',
  ModuleInputSubmit = 'INPUT_SUBMIT',
  ModuleUpdate = 'UPDATE',
}

interface ReducerState {
  loadedModules: EnclaveData[];
  moduleAdderInput: string;
}

interface ReducerAction {
  type: DispatcherType;
  payload?: {
    data: string | EnclaveData;
  }
}

function enclaveReducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case DispatcherType.ModuleInput: {
      if (action.payload && action.payload.data) {
        return {
          ...state,
          moduleAdderInput: action.payload.data as string,
        }
      }
      return { ...state, moduleAdderInput: '' };
    }
    case DispatcherType.ModuleUpdate: {
      // TODO: Implement module update logic
      console.info('Unfinished implementation.');
      return { ...state };
    }
    case DispatcherType.ModuleInputSubmit: {
      // TODO: Implement submit logic
      return { ...state, moduleAdderInput: '' };
    }
  }
}

export default function Enclave(): React.ReactNode {
  const [enclave, dispatchEnclave] = React.useReducer<ReducerState, [ReducerAction]>(enclaveReducer, defaultData);

  return (
    <EnclaveContext.Provider value={{
      enclave,
      dispatchEnclave,
      }}>
      <div>
        <ul>
          {enclave.loadedModules.map(mod => {
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
        { /** TODO: Create actions */ }
        <form 
          action="" 
          method="post"
          onSubmit={(e) => {
            e.preventDefault(); 
            dispatchEnclave({ type: DispatcherType.ModuleInputSubmit });
          }}
        >
          <input 
            type="text"
            id='module-adder-input' 
            value={enclave.moduleAdderInput}
            onChange={ (e) => dispatchEnclave({ type: DispatcherType.ModuleInput, payload: { data: e.target.value  } }) }
            placeholder=' Enter enclave name' 
          />
        </form>
      </div>
    </EnclaveContext.Provider>
  );
}
