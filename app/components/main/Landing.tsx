import React from 'react';

import './styles/Landing.css';
import { LandingHeader, LandingNavBar } from '@f';

export default function Landing() {
  return (
    <div id="main-landing">
      <LandingNavBar />
      <LandingHeader />
      <main role="main">
        Writing your own book, learning a specific craft, optimizing game strats—every journey warrants the need for archives, for sentiment or betterment.
      </main>
      <div className='mt-128'>
        What
      </div>
    </div>
  )
}
