import clsx from "clsx";
import Icon from "@mdi/react";
import { mdilPencil } from '@mdi/light-js';

export default function Button({ className = "", type, action, onAction }) {
  const Icn = (type) => {
    if(type === )
  }
  return (
    <button
      onClick={() => onAction}
      className={clsx(['btn'], className)}
    >{action}
    </button>
  );
}

