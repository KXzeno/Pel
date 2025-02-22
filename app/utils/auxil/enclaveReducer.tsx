import { 
  DispatcherMode,
  type EnclaveData,
  type ReducerState, 
  type ReducerAction,
} from '@main/types/Enclave.types';

export default function enclaveReducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case DispatcherMode.ModuleInput: {
      if (action.payload && action.payload.data) {
        return {
          ...state,
          moduleAdderInput: action.payload.data as string,
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
