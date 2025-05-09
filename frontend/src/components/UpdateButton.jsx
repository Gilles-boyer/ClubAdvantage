import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ index, onUpdate, currentName='', currentDesc='' }) {
  const handleClick = () => {
    const categoryToEdit = {
      index,
      name: currentName,
      description: currentDesc
    }

    onUpdate(categoryToEdit)
    console.log('Valeurs par défaut :', currentName, currentDesc);
    
  };

  return (
    <Icon path={mdilPencil} size={1.2} onClick={handleClick} className='p-1 text-blue-700 mask mask-squircle hover:text-white hover:bg-blue-700 me-2' />
  );
}
