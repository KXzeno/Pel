import type { 
  ReducerState,
  ReducerAction,
} from '@main/types/Landing.types';

export default function evtReducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case 'trigger': {
      state.controller.dispatch();
      return state;
    }
    case 'queue': {
      if (action.payload == null) {
        console.debug('No payload received.');
        return { ...state };
      }
      const { evt } = action.payload;
      if (evt instanceof Promise || evt instanceof Function) {
        state.controller.append(evt);
        if (!state.controller.active) {
          state.controller.dispatch();
        }
      } else {
        console.error('Not an event / promise.');
      }
      return state;
    }
    case 'clear': {
      state.controller.clear();
      return state;
    }
  }
}

