'use client';
import React from 'react';

import BlackHole from '@f/BlackHole';
import { EnclaveContext } from '@providers/EnclaveProvider';
import { DispatcherMode } from '@main/types/Enclave.types';
import './styles/Sample.css';

export default function Sample() {
  const { enclave, dispatchEnclave } = React.useContext(EnclaveContext);

  React.useEffect(() => {
    console.log(dispatchEnclave);
  }, [dispatchEnclave]);

  return (
    <div>
      <ul className='flex flex-row'>
        { /** Recursively create enclave nodes */ }
        {enclave.loadedModules && enclave.loadedModules.map(mod => {
          return (
            <li key={mod.id}>
              { /** Wrap nodes with black hole effect */ }
              <BlackHole id={mod.id}>
                <p className='abs-center font-diphylleia -translate-y-10 text-nowrap'>{mod.name}</p>
                <button type="button" className='w-5 h-5 border-2 border-violet-300/50 rounded-lg bg-violet-300/50 cursor-pointer' /> 
              </BlackHole>
            </li>
          );
        })}
      </ul>
      { /** TODO: Create actions */ }
      { /** Contains input value as form data */ }
      <form 
        action="" 
        method="post"
        onSubmit={(e) => {
          console.log('mhm');
          e.preventDefault(); 
          dispatchEnclave({ 
            type: DispatcherMode.ModuleInputSubmit,
            payload: {
              data: enclave.moduleAdderInput,
            }
          });
        }}
      >
        { /** Input box displayer & form sender */ }
        <button 
          type='button' 
          id='module-adder'
          onClick={(e) => dispatchEnclave({ 
            type: DispatcherMode.ShowModuleInput,
            payload: { data: e.target as HTMLButtonElement }
          })}
        >
          +
        </button>
        {/** Only show input box on visible state */}
        {enclave.isInputVisible && <input 
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
          onKeyDown={(e: React.KeyboardEvent) => {
            switch (e.key) {
              case 'Enter': {
                e.preventDefault();
                const btn = (e.target as HTMLInputElement).previousElementSibling as HTMLButtonElement;
                if (btn) {
                  btn.click();
                }
              }
            }
          }}
        />}
      </form>
    </div>
  );
}
