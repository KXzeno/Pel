'use client';

import React, { PointerEvent } from 'react';
import Link from 'next/link';

import useObserver from '@hooks/useObserver';
import '@main/styles/LandingNavBar.css';

/** 
 * Alternates 'nav-radial' and 'nav-radial-off' selectors
 * 
 * @typeParam R - Union type of element(s)
 * @param radialOrRadialCollection - A single or collection of radial-representing div elements 
 */
function toggleRadial<R extends NodeListOf<Element> | Element>(radialOrRadialCollection: R): void {
  /**
   * Event listener callback that removes a selector class post-animation
   *
   * @param event - the event triggered
   */
  let handleRemoveOnEnd = (event: Event) => {
    let target = (event.currentTarget as HTMLDivElement); 
    target.classList.remove('nav-radial-off');
    // Questionable garbage collection
    target.removeEventListener('animationend', handleRemoveOnEnd);
  }

  // IF the function arg is a collection, iterate over it and
  // remove the fade-out animation
  radialOrRadialCollection instanceof NodeList ? radialOrRadialCollection.forEach(radial => {
    radial.addEventListener('animationend', handleRemoveOnEnd);
    radial.classList.toggle('nav-radial-off', true);
    // ELSE if the arg is a single element, invoke an IIFE that
    // parses it's preceding sibling (the radial) and trigger
    // animations with leave/enter logic
  }) : +((elem) => {
    let precedingSibling = elem.previousElementSibling;

    // Return 'never' if the radial doesn't exist
    // TODO: Manage fallbacks / create error instances
    if (precedingSibling === null) {
      return;
    }

    // Enter/leave logic predicates off the existence of this selector
    let isEntering = !precedingSibling.classList.contains('nav-radial');

    if (isEntering) {
      precedingSibling.classList.toggle('nav-radial');
    } else {
      precedingSibling.classList.toggle('nav-radial');
      precedingSibling.classList.toggle('nav-radial-off');
      precedingSibling.addEventListener('animationend', handleRemoveOnEnd);
    }
  })(radialOrRadialCollection);
}

/**
 * Core event handler passed to the anchor elements for pointer events
 *
 * @param event - the event triggered
 */
function handleRadialActivation(event: PointerEvent<HTMLAnchorElement>) {
  toggleRadial(event.target as Element);
}

/**
 * A React functional component creating the navigation bar for the landing apge
 *
 * @returns a react node accessed by ancestor RFC 'Landing.tsx'
 */
export default function LandingNavBar(): React.ReactNode {
  // Initialize custom hook utilizing intersection observer API
  let [observed, observedRef] = useObserver();

  React.useEffect(() => {
    // On mount, remove the radials after their animations
    let radialCollection = document.querySelectorAll('.nav-radial-off');
    toggleRadial(radialCollection);

    if (observedRef.current !== null) {
      // TODO: Add collapse and merge/repel design when the navbar is out of screen
      console.log('-----------------------------------');
    }
  }, [observed]);

  return (
    <>
      <nav 
        ref={observedRef}
        id="main-nav" 
        className='text-white'
      >
        <div id='nav-ctr'>
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='sample-nav-btn' 
              href='none'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
            >
              Sample
            </Link>
          </div>
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='blog-nav-btn' 
              href='none'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
            >
              Blog
            </Link>
          </div>
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='docs-nav-btn'
              href='none'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
            >
              Docs
            </Link>
          </div>
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='discord-nav-btn'
              href='none'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
            >
              Discord
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

