"use client"

import React from 'react';
import '../main/styles/BlackHole.css';

export default function BlackHole({ children, id }: { children: React.ReactNode, id: string }) {
  const [spiralPaths, setSpiralPaths] = React.useState<string[]>([]);

  function expand() {
    const ctr = document.querySelector(`[data-id='${id}']`);
    if (!ctr) {
      return;
    }
    ctr.classList.add('animate-size-up');
    ctr.addEventListener('animationend',function removeAnimation() {
      ctr.classList.remove('animate-size-up');
      ctr.removeEventListener('animationend', removeAnimation);
    });
    (ctr as HTMLElement).style.transform = `scale(1)`;
  }

  function condense() {
    const ctr = document.querySelector(`[data-id='${id}']`);
    if (!ctr) {
      return;
    }
    ctr.classList.add('animate-size-down');
    ctr.addEventListener('animationend', function removeAnimation() {
      ctr.classList.remove('animate-size-down');
      ctr.removeEventListener('animationend', removeAnimation);
    });
    (ctr as HTMLElement).style.transform = `scale(0)`;
  }

  const createSpiralPath = (rotation = 0) => {
    let path = "M "
    const turns = 3
    const points = 200
    for (let i = 0; i < points; i++) {
      const t = (i / (points - 1)) * turns * Math.PI * 2
      const scale = Math.pow(0.8, t / (Math.PI * 2))
      const x = 50 * scale * Math.cos(t + rotation)
      const y = 50 * scale * Math.sin(t + rotation)
      path += `${x},${y} `
      if (i === 0) path += "L "
    }
  return path
  }

  React.useEffect(() => {
    requestAnimationFrame(condense);
    const rotations = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 3];
    const paths = rotations.map(rotation => createSpiralPath(rotation));
    setSpiralPaths(paths);
  }, []);

  return (
    <div className="blackhole-ctr">
      {/* Background glow */}
      <div className="blackhole-glow" />

      {/* Outer spiral arms */}
      <div 
        className="blackhole-spiral"
        data-id={id}
      >
        <svg 
          viewBox="-50 -50 100 100" 
          className="blackhole"
        >
          {spiralPaths.map((path, i) => (
            <g key={i} className="opacity-90">
              <path
                d={path}
                fill="none"
                stroke="url(#spiralGradient)"
                strokeWidth="0.5"
                className="blackhole-blur"
              />
            </g>
          ))}

          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div 
        className='blackhole-center'
        onPointerEnter={() => { 
          requestAnimationFrame(expand);
        }}
        onPointerLeave={() => { 
          requestAnimationFrame(condense);
        }}
      >
        { children }
      </div>
    </div>
  )
}
