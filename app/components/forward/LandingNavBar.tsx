'use client';

import React from 'react';

import useObserver from '@hooks/useObserver';

export default function LandingNavBar() {
  // Initially split to allow emphasis on page title
  // Then with intersection observer, animate/collide them

  let [observed, observedRef] = useObserver();

  React.useEffect(() => {
    if (observedRef.current !== null) {
      console.log('-----------------------------------');
    }
  }, [observed]);

  return (
    <>
      <div 
        ref={observedRef}
        id="main-nav" 
        className='text-white'
      >
        Test
      </div>
    </>
  )
}

