import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateOfferBtn({ index, onUpdate, currentTitle='', currentDesc='' }) {
  const handleClick = () => {
    const offerToEdit = {
      index,
      title: currentTitle,
      description: currentDesc
    }

    onUpdate(offerToEdit)
    console.log('Valeurs par défaut :', currentTitle, currentDesc);
    
  };

  return (
    <Icon path={mdilPencil} size={1.2} onClick={handleClick} className='p-1 text-blue-700 mask mask-squircle hover:text-white hover:bg-blue-700 me-2' />
  );
}
