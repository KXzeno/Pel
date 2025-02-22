import { 
  DispatcherMode,
  type EnclaveData,
  type ReducerState, 
  type ReducerAction,
} from '@main/types/Enclave.types';

/**
 * Reducer function for reducer hook used in EnclaveProvider
 *
 * @param state - the reducer hook's state
 * @param action - the reducer hook's action types and behaviors
 * @return a new state for next render
 */
export default function enclaveReducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    // Carries input value 
    case DispatcherMode.ModuleInput: {
      // Predicate
      if (action.payload && isString(action.payload)) {
        return {
          ...state,
          moduleAdderInput: action.payload.data,
        }
      }
      return { ...state, moduleAdderInput: '' };
    }
    // Reflects data changes from client to server
    // TODO: Implement module update logic when using database
    case DispatcherMode.ModuleUpdate: {
      console.info('Unfinished implementation.');
      return { ...state };
    }
    // Parses and resets input value
    case DispatcherMode.ModuleInputSubmit: {
      // Predicate
      if (!isString(action.payload)) {
        throw new Error('No input parsed.');
      }

      // Return "nothing" if parsed input is empty
      if ((action.payload.data).length === 0) {
        return { ...state };
      }

      // Destructure input from payload
      const { data: input } = action.payload;

      // Create enclave data using input as its name
      const newModule: EnclaveData = { 
        id: `E${state.loadedModules.length + 1}`,
        name: input as string,
      }

      // TODO: Implement deletion logic
      // Add deletion marker array to reclaim unused enclave ids,
      // perhaps with bonus syntax that indicates reclaim

      return { loadedModules: [...state.loadedModules, newModule], moduleAdderInput: '', isInputVisible: false };
    }
    // Adds dynamic toggle & send to button
    case DispatcherMode.ShowModuleInput: {
      // Predicate
      if (!isButtonElement(action.payload)) {
        throw new Error('Button event misfired.')
      }
      // Destructure element from payload
      const { data: elem } = action.payload;

      // Get button type to check if 'button' or 'submit'
      const btnType = elem.getAttribute('type');

      // If of type button, display input box and turn button to of type submit
      if (btnType === 'button' && state.isInputVisible === false) {
        elem.setAttribute('type', 'submit');
        return { ...state, isInputVisible: true };
      } else if (btnType === 'submit' && state.moduleAdderInput.length > 0) {
        // If of type submit with valid input, force trigger to dispatch the input and revert to button type
        elem.click();
        elem.setAttribute('type', 'button');
        return { ...state, isInputVisible: false };
      }
      /**
       * Add fallback
       *
       * @privateRemarks
       *
       * Without this, the control flow would bug. When clicking the
       * button on initial render, it manages to set its attribute but not
       * the visible state despite rendering twice (in development). This
       * might have to do with how React rerenders for "state tests"
       */
      return { ...state, isInputVisible: true };
    }
  }
}

/**
 * Type predicate for a payload carrying a button element
 *
 * @param payload - the dispatcher payload
 */
function isButtonElement(payload: ReducerAction['payload']): payload is { data: HTMLButtonElement } {
  return payload ? payload.data instanceof HTMLElement : false;
}


/**
 * Type predicate for a payload carrying a string
 *
 * @param payload - the dispatcher payload
 */
function isString(payload: ReducerAction['payload']): payload is { data: string } {
  return payload ? typeof payload.data === 'string' : false;
}

/**
 * Type predicate for a payload carrying EnclaveData
 *
 * @param payload - the dispatcher payload
 */
function isEnclaveData(payload: ReducerAction['payload']): payload is { data: EnclaveData } {
  return payload ? Object.keys(payload.data)[0] === 'id' : false;
}
