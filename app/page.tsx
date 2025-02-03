import Image from "next/image";

import { 
  Alteration, 
  Destruction, 
  Illusion, 
  Conjuration, 
  Restoration, 
  Enchanting 
} from '@/Icons/base';

export default function Home() {
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
