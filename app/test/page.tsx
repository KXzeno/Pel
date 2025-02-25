'use client';
import React from 'react';

import Enclave from '@providers/EnclaveProvider';
import Sample from '@main/Sample';
import '../components/main/styles/Sample.css';

export default function Page() {

  return (
    <Enclave>
      <Sample />
    </Enclave>
  );
}

