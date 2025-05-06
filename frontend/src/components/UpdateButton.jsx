import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ id, onDelete }) {
  const handleClick = () => {
    if (window.confirm("Supprimer cet élément ?")) {
      onDelete(id)
      .catch((err) => console.error("Erreur DELETE :", err));
    }
  };

  return (
    <Icon path={mdilPencil} size={1.2} onClick={handleClick} className='p-1 text-blue-700 mask mask-squircle hover:text-white hover:bg-blue-700 me-2' />
  );
}
