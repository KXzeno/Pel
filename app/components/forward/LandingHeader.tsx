'use client';

import React from 'react';

export default function LandingHeader() {

  return (
    <header>
      <div id="hero-radial" />
      <div id="hero">
        <h1>Pel</h1>
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

