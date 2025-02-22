import type { 
  ReducerState,
  ReducerAction,
} from '@main/types/Landing.types';

/**
 * Reducer function for reducer hook used in LandingHeader
 *
 * @param state - the reducer hook's state
 * @param action - the reducer hook's action types and behaviors
 * @return a new state for next render
 */
export default function evtReducer(state: ReducerState, action: ReducerAction) {
  // TODO: Consider this action type's inutility
  switch (action.type) {
    case 'trigger': {
      state.controller.dispatch();
      return state;
    }
    case 'queue': {
      // Validate truthiness
      if (action.payload == null) {
        console.debug('No payload received.');
        return { ...state };
      }
      // Destructure promise or function (event) from payload
      const { evt } = action.payload;
      // Predicate
      if (evt instanceof Promise || evt instanceof Function) {
        // Add event to queue
        state.controller.append(evt);
        // If queue isn't busy, run it
        if (!state.controller.active) {
          state.controller.dispatch();
        }
      } else {
        console.error('Not an event / promise.');
      }
      return state;
    }
    // TODO: Consider this action type's inutility
    case 'clear': {
      state.controller.clear();
      return state;
    }
  }
}

