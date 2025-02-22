'use client';

import React from 'react';

import '../main/styles/Sample.css';
import BlackHole from '../forward/BlackHole';
  // TODO: Assign this to user data when auth is set up
import { 
  DispatcherMode,
  type ContextData,
  type ReducerState, 
  type ReducerAction,
} from '@main/types/Enclave.types';
import { defaultData } from '@utils/DefaultEnclaveData';
import enclaveReducer from '@utils/auxil/enclaveReducer';

export const EnclaveContext: React.Context<ContextData> = React.createContext({
  // Defaults
  enclave: {} as ReducerState,
  dispatchEnclave: (() => null) as React.ActionDispatch<[ReducerAction]>,
});


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
          { /** TODO: Add active state and show input box when button pressed */ }
          +
        </button>
        { /** TODO: Create actions */ }
        <form 
          action="" 
          method="post"
          onSubmit={(e) => {
            e.preventDefault(); 
            dispatchEnclave({ 
              type: DispatcherMode.ModuleInputSubmit,
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
                type: DispatcherMode.ModuleInput, 
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
