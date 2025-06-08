import clsx from "clsx";
import Icon from "@mdi/react";
import { mdilPencil, mdilDelete } from '@mdi/light-js';


export default function Button({ type, action, onAction }) {
  const ICN = (type) => {
    if(type === 'update'){
      return (
            <Icon path={mdilPencil} 
            size={1.2}/>
      )
    }
    if(type === 'delete'){
      return (
            <Icon path={mdilDelete} 
            size={1.2}/>
      )
    }
  }
  return (
    <button
      onClick={onAction}
      className={clsx(['btn',type==='update' && 'btn-success p-1', type==='delete' && 'btn-error p-1'])}
    >{ICN(type)}{action}
    </button>
  );
}

