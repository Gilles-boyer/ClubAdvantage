import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function UpdateButton({ onUpdate }) {

  return (
      <div className="bg-blue-700 w-15 text-center rounded md:w-7">
        <Icon path={mdilPencil}
          size={1.2}
          onClick={onUpdate}
          className='p-1 text-blue-700 mask mask-squircle 
      text-white' />
      </div>
  );
}
