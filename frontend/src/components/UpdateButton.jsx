import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ onUpdate }) {

  return (
    <Icon path={mdilPencil} 
    size={1.2}
    onClick={onUpdate}
    className='p-1 bg-neutral text-white mask mask-squircle hover:bg-blue-700 me-2' />
  );
}
