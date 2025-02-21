'use client';

import React from 'react';

import '../main/styles/Sample.css';
import BlackHole from '../forward/BlackHole';

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
      // TODO: Implement module update logic when using database
      console.info('Unfinished implementation.');
      return { ...state };
    }
    case DispatcherType.ModuleInputSubmit: {
      console.log(action.payload);
      if (!action.payload) {
        throw new Error('No input parsed.');
      }

      // TODO: Properly submissions
      if ((action.payload.data as string).length === 0) {
        return { ...state };
      }

      const { data: input } = action.payload;

      const newModule: EnclaveData = { 
        id: `E${state.loadedModules.length + 1}`,
        name: input as string,
      }

      // TODO: Implement deletion logic
      // Add deletion marker array to reclaim enclave ids,
      // perhaps with bonus syntax that indicates reclaim

      return { loadedModules: [...state.loadedModules, newModule], moduleAdderInput: '' };
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
        <ul className='flex flex-row'>
          {enclave.loadedModules.map(mod => {
            return (
              <li key={mod.id}>
                <BlackHole id={mod.id}>
                  <p className='abs-center font-diphylleia -translate-y-10 text-nowrap'>{mod.name}</p>
                  <button type="button" className='w-5 h-5 border-2 border-violet-300/50 rounded-lg bg-violet-300/50 cursor-pointer' /> 
                </BlackHole>
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
            dispatchEnclave({ 
              type: DispatcherType.ModuleInputSubmit,
              payload: {
                data: enclave.moduleAdderInput,
              }
            });
          }}
        >
          <input 
            type="text"
            id='module-adder-input' 
            value={enclave.moduleAdderInput}
            onChange={ (e) => {
              dispatchEnclave({
                type: DispatcherType.ModuleInput, 
                payload: {
                  data: e.target.value  
                } 
              });
            }}
            placeholder=' Enter enclave name' 
          />
        </form>
      </div>
    </EnclaveContext.Provider>
  );
}
