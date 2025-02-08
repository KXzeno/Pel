'use client';

import React from 'react';

import useObserver from '@hooks/useObserver';

export default function LandingHeader() {
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

    // Declare higher scope event listener to assist garbage collection
    function handleClearMergeAnimationOnEnd(event: Event) {
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
                // Force selector marker on subgrid to invoke combinator 
                // effect on primary grid, minimizing the column width
              case 'left': leftHalf[1].classList.remove('merged'); 
                break;
                // Revert marker to restore grid styles and to avoid off-setted animation
              case 'right': leftHalf[1].classList.add('merged');
                break;
            }
            continue;
          }
        }
      }
    }

    if (evoked === false) {
      // Add the merge-in transitions when header is out of screen
      leftHalf.forEach(navItem => {
        navItem.classList.add('nav-item-merged-from-left');
        navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
      });
      rightHalf.forEach(navItem => {
        navItem.classList.add('nav-item-merged-from-right');
        navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
      });
    } else {
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
      });
      rightHalf.forEach(navItem => { 
        navItem.classList.add('nav-item-merged-from-left');
        navItem.addEventListener('animationend', handleClearMergeAnimationOnEnd)
      });
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

