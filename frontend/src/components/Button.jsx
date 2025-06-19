import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiPencil, mdiDelete } from '@mdi/js';
import { HashLink } from "react-router-hash-link";


export default function Button({ label, action, onAction, className = '', href }) {
  //! Si on spécifie le type, alors l'icone apparaitra (soit 'update' soit 'delete')
      if (href && action === 'update') {
      return (
        <HashLink to={href}
        onClick={onAction}
          className={'btn inline-flex justify-center items-center mask mask-squircle text-white bg-blue-700 p-1.5 hover:scale-105 hover:-translate-y-1 transition-transform'}>
          <Icon path={mdiPencil}
            size={0.70} />
        </HashLink>
      )
    }
  const ICN = (action) => {
    if (action === 'update'){
      return (
        <Icon path={mdiPencil}
            size={0.70} />
      )
    }
    if (action === 'delete') {
      return (
        <Icon path={mdiDelete}
          size={0.70} />
      )
    }
  }
  return (
    <button
      onClick={onAction}
      className={clsx(['btn',
        action === 'update' && 'mask mask-squircle text-white bg-blue-700 p-1.5 hover:scale-105 hover:-translate-y-1 transition-transform',
        action === 'delete' && 'mask mask-squircle text-white bg-red-700 p-1.5 hover:scale-105 hover:-translate-y-1 transition-transform',
        label && 'uppercase text-xs hover:scale-105 hover:-translate-y-1 transition-transform',
        className])}
    >
      {/* Si le type est spécifié alors l'icône apparaitra, sinon c'est la valeur inscrite dans 'action' qui apparaitra */}
      {action ? ICN(action) : label}

    </button>
  );
}

