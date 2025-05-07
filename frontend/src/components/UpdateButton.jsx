import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ index, onUpdate, label1='', label2='', currentVal1='', currentVal2='' }) {
  const handleClick = () => {
    const updateVal1 = prompt(`Modifier le ${label1} :`, currentVal1);
    const updateVal2 = prompt(`Modifier le ${label2} :`, currentVal2);

    if (updateVal1 === null || updateVal2 === null) return;

    const finalVal1 = updateVal1.trim() !== "" ? updateVal1 : currentVal1;
    const finalVal2 = updateVal2.trim() !== "" ? updateVal2 : currentVal2;

    onUpdate(index, finalVal1, finalVal2)
      .catch((err) => console.error("Erreur UPDATE :", err));
  };

  return (
    <Icon path={mdilPencil} size={1.2} onClick={handleClick} className='p-1 text-blue-700 mask mask-squircle hover:text-white hover:bg-blue-700 me-2' />
  );
}
