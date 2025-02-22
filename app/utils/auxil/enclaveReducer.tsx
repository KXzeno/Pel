import { 
  DispatcherMode,
  type EnclaveData,
  type ReducerState, 
  type ReducerAction,
} from '@main/types/Enclave.types';

export default function enclaveReducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case DispatcherMode.ModuleInput: {
      if (action.payload && isString(action.payload)) {
        return {
          ...state,
          moduleAdderInput: action.payload.data,
        }
      }
      return { ...state, moduleAdderInput: '' };
    }
    case DispatcherMode.ModuleUpdate: {
      // TODO: Implement module update logic when using database
      console.info('Unfinished implementation.');
      return { ...state };
    }
    case DispatcherMode.ModuleInputSubmit: {
      if (!isString(action.payload)) {
        throw new Error('No input parsed.');
      }

      // TODO: Properly submissions
      if ((action.payload.data).length === 0) {
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

      return { loadedModules: [...state.loadedModules, newModule], moduleAdderInput: '', isInputVisible: false };
    }
    case DispatcherMode.ShowModuleInput: {
      if (!isButtonElement(action.payload)) {
        throw new Error('Button event misfired.')
      }
      const { data: elem } = action.payload;
      const btnType = elem.getAttribute('type');

      if (btnType === 'button' && state.isInputVisible === false) {
        elem.setAttribute('type', 'submit');
        return { ...state, isInputVisible: true };
      } else if (btnType === 'submit' && state.moduleAdderInput.length > 0) {
        elem.click();
        elem.setAttribute('type', 'button');
        return { ...state, isInputVisible: false };
      }
      return { ...state, isInputVisible: true };
    }
  }
}

/**
 *
 */
function isButtonElement(payload: ReducerAction['payload']): payload is { data: HTMLButtonElement } {
  return payload ? payload.data instanceof HTMLElement : false;
}


/**
 *
 */
function isString(payload: ReducerAction['payload']): payload is { data: string } {
  return payload ? typeof payload.data === 'string' : false;
}

/**
 *
 */
function isEnclaveData(payload: ReducerAction['payload']): payload is { data: EnclaveData } {
  return payload ? Object.keys(payload.data)[0] === 'id' : false;
}
