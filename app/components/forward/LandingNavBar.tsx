'use client';

import React, { PointerEvent } from 'react';
import Link from 'next/link';

import '@main/styles/LandingNavBar.css';

/** 
 * Alternates 'nav-radial' and 'nav-radial-off' selectors
 * 
 * @typeParam R - Union type of element(s)
 * @param radialOrRadialCollection - A single or collection of radial-representing div elements 
 */
function toggleRadial<R extends NodeListOf<Element> | Element>(radialOrRadialCollection: R) {
  /**
   * Event listener callback that removes a selector class post-animation
   *
   * @param event - the event triggered
   */
  const handleRemoveOnEnd = (event: Event) => {
    const target = (event.currentTarget as HTMLDivElement); 
    target.classList.remove('nav-radial-off');
    // Questionable garbage collection
    target.removeEventListener('animationend', handleRemoveOnEnd);
  }

   /** 
    * IF the function arg is a collection, iterate over it and
    * remove the fade-out animation
    *
    * @remarks
    *
    * IIFEs invoked by the unary operator returns 0 | 1 depending
    * on return type false | true
    */
  let invoked: number | null = radialOrRadialCollection instanceof NodeList ? +((collection) => {
    collection.forEach(radial => {
      radial.addEventListener('animationend', handleRemoveOnEnd);
      radial.classList.toggle('nav-radial-off', true);
    });
    return true;
    // ELSE if the arg is a single element, invoke an IIFE that
    // parses it's preceding sibling (the radial) and trigger
    // animations with leave/enter logic
  })(radialOrRadialCollection) : +((elem) => {
    const precedingSibling = elem.previousElementSibling;

    // Return 'never' if the radial doesn't exist
    // TODO: Manage fallbacks / create error instances
    if (precedingSibling === null) {
      return false;
    }

    // Enter/leave logic predicates off the existence of this selector
    const isEntering = !precedingSibling.classList.contains('nav-radial');

    if (isEntering) {
      precedingSibling.classList.toggle('nav-radial');
    } else {
      precedingSibling.classList.toggle('nav-radial');
      precedingSibling.classList.toggle('nav-radial-off');
      precedingSibling.addEventListener('animationend', handleRemoveOnEnd);
    }
    return true;
  })(radialOrRadialCollection);

  // Cleanup IIFE
  switch (invoked) {
    case 0: throw new Error('Radial toggling conflicted, check code for underlying issue.');
    case 1: invoked = null;
  }
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
  React.useEffect(() => {
    // On mount, remove the radials after their animations
    const radialCollection = document.querySelectorAll('.nav-radial-off');
    toggleRadial(radialCollection);
  }, []);

  return (
    <>
      <nav 
        id="main-nav" 
        className='text-white'
      >
        <div id='nav-ctr'>
          <div className='nav-item cursor-not-allowed'>
            <div className='nav-radial-off cursor-not-allowed' />
            <Link 
              id='sample-nav-btn' 
              href='none'
              className='cursor-not-allowed'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Sample
            </Link>
          </div>
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='blog-nav-btn' 
              href='https://blog.karnovah.com/'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
            >
              Blog
            </Link>
          </div>
          <div className='nav-item cursor-not-allowed'>
            <div className='nav-radial-off cursor-not-allowed' />
            <Link 
              id='docs-nav-btn'
              href='none'
              className='cursor-not-allowed'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Docs
            </Link>
          </div>
          <div className='nav-item cursor-not-allowed'>
            <div className='nav-radial-off cursor-not-allowed' />
            <Link 
              id='discord-nav-btn'
              href='none'
              className='cursor-not-allowed'
              onPointerOver={handleRadialActivation}
              onPointerLeave={handleRadialActivation}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Discord
            </Link>
          </div>
          <div id="navbar-bg"/>
        </div>
      </nav>
    </>
  )
}

