'use client';

import React from 'react';

import useObserver from '@hooks/useObserver';
import CQDispatcher from '@/utils/CQDispatcher';

type ReducerState = {
  controller: CQDispatcher<any, any>;
}

type ReducerAction = {
  type: 'queue' | 'clear' | 'trigger' ;
  payload?: {
    evt: unknown;
  }
}

function evtReducer(state: ReducerState, action: ReducerAction) {
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
      } else {
        // console.error('Not an event / promise.');
      }
      return state;
    }
    case 'clear': {
      state.controller.clear();
      return state;
    }
  }
}

export default function LandingHeader() {
  // Initialize reducer to persist dispatcher state
  const [evtState, dispatch] = React.useReducer<ReducerState, [ReducerAction]>(evtReducer, { controller: new CQDispatcher() });

  // Initialize custom hook utilizing intersection observer API
  const [observed, observedRef] = useObserver();

  React.useEffect(() => {
    // Extract relevant data
    const [{ evoked },]  = [observed, observedRef]

    // Terminate on initial observation
    if (evoked === null) {
      return;
    }

    // Retrieve collection of navigation items
    const navItems = document.querySelectorAll('.nav-item');

    // Throw an error if the items failed to retrieve
    if (navItems === null) { 
      throw new Error('Failed to retrieve navigation items.');
    }

    // Reference halves from collection to target with directional transitions
    const leftHalf = [navItems.item(0), navItems.item(1)];
    const rightHalf = [navItems.item(2), navItems.item(3)];

    // Reference background
    const bg = document.querySelector('#navbar-bg');
    if (bg === null) {
      throw new Error('Navbar background undetected.');
    }

    // Declare higher scope event listener to assist garbage collection
    function handleClearMergeAnimationOnEnd(event: Event) {
      // dispatch({ type: 'clear' });
      // Extract element from event target
      const navItem = event.target as HTMLDivElement;

      // Reference selectors from element
      const tokenEntries = navItem.classList.entries();

      for (const [, token] of tokenEntries) {
        // Parse token via regex for animation
        const match = token.match(/([\w\-]+?merged\-from[\w\-]+\s?)/);

        if (match && match.input) {
          // Remove animation on completion for readd
          navItem.classList.remove(match.input);
          if (navItem === rightHalf[1]) {
            // Parse index to get merge direction from animation name
            const mergeDirectionMatchIndex: number = match.input.search(/(left|right)$/);
            const mergeDirection: string = match.input.substring(mergeDirectionMatchIndex);

            switch (mergeDirection) {
              case 'left': { 
                // Force selector marker on subgrid to invoke combinator 
                // effect on primary grid, minimizing the column width
                leftHalf[1].classList.remove('merged'); 
                // Remove grow animation
                bg!.classList.remove('navbar-grow');
                break;
              }
              // Revert marker to restore grid styles and to avoid off-setted animation
              case 'right': { 
                leftHalf[1].classList.add('merged'); 
                // Remove shrink animation
                bg!.classList.remove('navbar-shrink');
                break;
              }
            }
            continue;
          }
        }
      }
    }
    const { leader, inactive } = evtState.controller.items();
    console.log(evtState.controller.items());
    if (evoked === false) {
      async function promiseAnim() {
        const mergeOut = new Promise((r,) => {
          const signalDispatch = (e: Event) => {
            r('successfully unmerged');
            e.target!.removeEventListener('animationend', signalDispatch);
          }
          // Add the merge-in transitions when header is out of screen
          leftHalf.forEach(navItem => {
            navItem.classList.add('nav-item-merged-from-left');
            navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
            navItem.addEventListener('animationend', signalDispatch);
          });
          rightHalf.forEach(navItem => {
            navItem.classList.add('nav-item-merged-from-right');
            navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
            navItem.addEventListener('animationend', signalDispatch);
          });
          // Invoke bg shrink animation
          bg!.classList.add('navbar-shrink');
        });
      }
      dispatch({ type: 'queue', payload: { evt: promiseAnim } });

    } else {
      async function promiseAnim() {
        const mergeIn = new Promise((r,) => {
          const signalDispatch = (e: Event) => {
            r('successfully unmerged');
            e.target!.removeEventListener('animationend', signalDispatch);
          }
          /**
           * Add the merge-in transitions when header is on screen
           *
           * @remarks
           *
           * The animations are the same, except distributed inversely, for
           * disparate animations on each event, create a new one
           */
          leftHalf.forEach(navItem => {
            navItem.classList.add('nav-item-merged-from-right')
            navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
            navItem.addEventListener('animationend', signalDispatch);
          });
          rightHalf.forEach(navItem => { 
            navItem.classList.add('nav-item-merged-from-left');
            navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
            navItem.addEventListener('animationend', signalDispatch);
          });
          // Invoke bg grow animation
          bg!.classList.add('navbar-grow');
        });
      }
        dispatch({ type: 'queue', payload: { evt: promiseAnim } });
    }

    // Handle cleanup
    return () => {
      navItems.forEach(navItem => navItem.removeEventListener('animationend', handleClearMergeAnimationOnEnd));
    };
  }, [observed, observedRef]);

  return (
    <header>
      <div id="hero-radial" />
      <div id="hero">
        <h1 ref={observedRef}>Pel</h1>
        <h2>Etch every experience onto a living surface</h2>
        <button 
          id="start-btn" 
          type="submit"
          onClick={() => console.log('Do nothing')}
        >
          Get Started
        </button>
      </div>
    </header>
  )
}

