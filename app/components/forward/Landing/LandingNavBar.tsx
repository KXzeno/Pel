'use client';

import React from 'react';
import Link from 'next/link';

import '@main/styles/LandingNavBar.css';
import handleRadialActivation, {
  toggleRadial,
} from '@/utils/auxil/radialActivation';

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
          <div className='nav-item'>
            <div className='nav-radial-off' />
            <Link 
              id='sample-nav-btn' 
              href='/sample'
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

