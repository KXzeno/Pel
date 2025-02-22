export interface EnclaveData {
  id: `E${number}`;
  name: string;
  [index: `${number}C${number}` | `${number}C${number}:${number}`]: object;
}

export interface DefaultData {
  loadedModules: EnclaveData[];
  moduleAdderInput: string;
}

export type ContextData = {
  enclave: ReducerState;
  dispatchEnclave: React.ActionDispatch<[ReducerAction]>;
  
}

export interface ReducerState {
  loadedModules: EnclaveData[];
  moduleAdderInput: string;
}

export interface ReducerAction {
  type: DispatcherMode;
  payload?: {
    data: string | EnclaveData;
  }
}

export enum DispatcherMode {
  ModuleInput = 'INPUT',
  ModuleInputSubmit = 'INPUT_SUBMIT',
  ModuleUpdate = 'UPDATE',
}
