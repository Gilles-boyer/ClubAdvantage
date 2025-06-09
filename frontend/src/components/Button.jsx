import clsx from "clsx";
import Icon from "@mdi/react";
import { mdilPencil, mdilDelete } from '@mdi/light-js';


export default function Button({ type, action, onAction, className = '' }) {
  //! Si on spécifie le type, alors l'icone apparaitra (soit 'update' soit 'delete')
  const ICN = (type) => {
    if (type === 'update') {
      return (
        <Icon path={mdilPencil}
          size={0.70} />
      )
    }
    if (type === 'delete') {
      return (
        <Icon path={mdilDelete}
          size={0.70} />
      )
    }
  }
  return (
    <button
      onClick={onAction}
      className={clsx(['btn', 
        type === 'update' && 'mask mask-squircle text-white bg-blue-700 p-1.5 hover:scale-105 hover:-translate-y-1 transition-transform', 
        type === 'delete' && 'mask mask-squircle text-white bg-red-700 p-1.5 hover:scale-105 hover:-translate-y-1 transition-transform',
        action && 'uppercase text-xs hover:scale-105 hover:-translate-y-1 transition-transform',
        className])}
    >
      {/* Si le type est spécifié alors l'icône apparaitra, sinon c'est la valeur inscrite dans 'action' qui apparaitra */}
      {type ? ICN(type) : action}
    </button>
  );
}

