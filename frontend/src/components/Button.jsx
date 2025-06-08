import clsx from "clsx";
import Icon from "@mdi/react";
import { mdilPencil, mdilDelete } from '@mdi/light-js';
import { useNavigation } from "react-router-dom";


export default function Button({path, type, action, onAction, className = '' }) {
  const navigate = useNavigation()
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
      onClick={path ? navigate(path) : onAction}
      className={clsx(['btn', type === 'update' && 'mask mask-squircle hover:text-white hover:bg-blue-700', type === 'delete' && 'mask mask-squircle hover:text-white hover:bg-red-700', className])}
    >{type ? ICN(type) : action}
    </button>
  );
}

