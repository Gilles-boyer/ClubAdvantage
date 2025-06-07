import Icon from "@mdi/react";
import { mdilDelete } from '@mdi/light-js';

export default function DeleteButton({ onDelete }) {
  return (
    <div className="bg-red-700 w-15 text-center rounded md:w-7">
      <Icon path={mdilDelete}
        size={1.2}
        onClick={onDelete}
        className='p-1 text-red-700 mask mask-squircle 
    text-white' />
    </div>

  );
}
