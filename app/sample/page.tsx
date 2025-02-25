import React from 'react';
import Link from 'next/link';

import BlackHole from '@/components/forward/BlackHole';
import '../components/main/styles/Sample.css';

export default function Page() {
  return (
    <div>
      <div className='relative mx-auto text-center w-62 translate-y-8'>
        <p>IN DEVELOPMENT</p>
        <p className='text-xs'>To see the reflection of development, manually visit the <Link href='/test'><code className='text-purple-600 hover:text-violet-900'>/test</code></Link> route</p>
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

