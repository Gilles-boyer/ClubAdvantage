import Icon from "@mdi/react";
import { mdilDelete } from '@mdi/light-js';

export default function DeleteButton({ onDelete }) {
  return (
    <Icon path={mdilDelete} 
    size={1.2} 
    onClick={onDelete} 
    className='p-1 text-white bg-primary mask mask-squircle hover:bg-red-700 me-2' />
  );
}
