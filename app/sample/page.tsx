import React from 'react';
import Link from 'next/link';

import BlackHole from '@/components/forward/BlackHole';
import '../components/main/styles/Sample.css';

export default function Page() {
  return (
    <div>
      <div className='relative mx-auto text-center w-62 translate-y-8'>
        <p>IN DEVELOPMENT</p>
        <ul className='text-xs text-left'>
          <li>- Adopt similar structure to <Link href='https://github.com/KXzeno/adk' className='text-blue-500 hover:text-blue-800'>ADK</Link> </li>
          <li>- Input forms linking to database</li>
          <li>- Highlight linked nodes when hovering</li>
          <li>- Create dynamic route for each enclave node</li>
          <li>- Remit node sorting; implement relationships / inner modules </li>
        </ul>
      </div>
      <div className='flex flex-row w-[95%] h-[80%] justify-self-center justify-center gap-7 mt-80'>
        <div>
          <BlackHole id='field'>
            <p className='abs-center font-diphylleia -translate-y-10 text-nowrap'>Field</p>
            <button type="button" className='w-5 h-5 border-2 border-violet-300/50 rounded-lg bg-violet-300/50 cursor-pointer' /> 
          </BlackHole>
        </div>
        <div>
          <BlackHole id='java'>
            <p className='abs-center font-diphylleia -translate-y-10 text-nowrap'>Java</p>
            <button type="button" className='w-5 h-5 border-2 border-violet-300/50 rounded-lg bg-violet-300/50 cursor-pointer' /> 
          </BlackHole>
        </div>
        <div>
          <BlackHole id='starcraft-2'>
            <p className='abs-center font-diphylleia -translate-y-10 text-nowrap'>StarCraft II</p>
            <button type="button" className='w-5 h-5 border-2 border-violet-300/50 rounded-lg bg-violet-300/50 cursor-pointer' /> 
          </BlackHole>
        </div>
      </div>
    </div>
  );
}

