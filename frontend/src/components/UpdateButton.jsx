import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ index, onUpdate, label1='', label2='' }) {
  const handleClick = () => {
    const updateVal1 = prompt(`Saisissez la nouvelle valeur pour : ${label1}`);
    const updateVal2 = prompt(`Saisissez la nouvelle valeur pour : ${label2}`)
    if (updateVal1) {
      onUpdate(index, updateVal1, updateVal2)
        .catch((err) => console.error("Erreur DELETE :", err));
    }
  };

  return (
    <Icon path={mdilPencil} size={1.2} onClick={handleClick} className='p-1 text-blue-700 mask mask-squircle hover:text-white hover:bg-blue-700 me-2' />
  );
}
