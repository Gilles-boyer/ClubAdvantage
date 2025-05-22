import Icon from "@mdi/react";
import { mdilDelete } from '@mdi/light-js';

export default function DeleteButton({ onDelete }) {
  return (
    <Icon path={mdilDelete} size={1.2} onClick={onDelete} className='p-1 text-red-700 mask mask-squircle hover:text-white hover:bg-red-700 me-2' />
  );
}
