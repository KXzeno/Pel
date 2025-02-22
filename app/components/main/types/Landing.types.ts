import CQDispatcher from '../../../utils/core/CQDispatcher';

export type EvtDispatcher = CQDispatcher<string, Evt>;

export type Evt = Promise<string> | (() => Promise<string>);

export type ReducerState = {
  controller: EvtDispatcher;
}

export type ReducerAction = {
  type: 'queue' | 'clear' | 'trigger' ;
  payload?: {
    evt: Promise<string> | (() => Promise<string>);
  }
}

