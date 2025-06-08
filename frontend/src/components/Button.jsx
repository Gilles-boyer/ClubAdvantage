import clsx from "clsx";
import Icon from "@mdi/react";
import { mdilPencil, mdilDelete } from '@mdi/light-js';


export default function Button({ type, action, onAction, className = '' }) {
  const ICN = (type) => {
    if (type === 'update') {
      return (
        <Icon path={mdilPencil}
          size={0.90} />
      )
    }
    if (type === 'delete') {
      return (
        <Icon path={mdilDelete}
          size={0.90} />
      )
    }
  }
  return (
    <button
      onClick={onAction}
      className={clsx(['btn', type === 'update' && 'mask mask-squircle hover:text-white hover:bg-blue-700', type === 'delete' && 'mask mask-squircle hover:text-white hover:bg-red-700', className])}
    >{type ? ICN(type) : action}
    </button>
  );
}

