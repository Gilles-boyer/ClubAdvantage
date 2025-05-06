import Icon from "@mdi/react";
import { mdilDelete } from '@mdi/light-js';

export default function DeleteButton({ id, onDelete }) {
  const handleClick = () => {
    if (window.confirm("Supprimer cet élément ?")) {
      onDelete(id)
      .catch((err) => console.error("Erreur DELETE :", err));
    }
  };

  return (
    <Icon path={mdilDelete} size={1.2} onClick={handleClick} className='p-1 text-red-700 mask mask-squircle hover:text-white hover:bg-red-700 me-2' />
  );
}
