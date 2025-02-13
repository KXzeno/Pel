import React from 'react';

import './styles/Landing.css';
import { LandingHeader, LandingNavBar } from '@f';

export default function Landing() {
  return (
    <main id="main-landing">
      <LandingNavBar />
      <LandingHeader />
      <h1>
        Writing your own book, learning a specific craft, optimizing game strats—every journey warrants the need for archives, for sentiment or betterment.
      </h1>
      <div className='mt-512'>
        What
      </div>
    </main>
  )
}
