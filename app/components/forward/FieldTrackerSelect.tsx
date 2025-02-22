import React from 'react';

import { 
  Alteration, 
  Destruction, 
  Illusion, 
  Conjuration, 
  Restoration, 
  Enchanting 
} from '@f/icons/base';

export default function FieldTrackerSelect() {
  return (
    <div role='group'>
      <Alteration size={64} />
      <Destruction size={64} />
      <Illusion size={64} />
      <Conjuration size={64} />
      <Restoration size={64} />
      <Enchanting size={64} />
    </div>
  );
}

