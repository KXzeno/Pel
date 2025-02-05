import React from 'react';

import './styles/Landing.css';
import LandingHeader from '@f/LandingHeader';
import useObserver from '@hooks/useObserver';

export default function Landing() {
  console.log(useObserver(null));
  return (
    <div id="main-landing">
      <LandingHeader />
      {/*<main role="main">
        Writing your own book, learning a specific craft, optimizing game strats—every journey warrants the need for archives, for sentiment or betterment.
        </main>*/}
    </div>
  )
}
