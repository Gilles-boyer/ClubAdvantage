import { useState, useRef, useEffect } from "react";
import Icon from "@mdi/react";
import * as mdi from "@mdi/js";

export default function IconSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);


  const keys = Object.keys(mdi).filter(k => k.startsWith("mdi"));

  const options = keys.map(key => ({ key, path: mdi[key] }));

  // click outside pour fermer
  useEffect(() => {
    const onClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = options.find(o => o.key === value);

  return (
    <div className="relative w-64" ref={ref}>
      <button
        type="button"
        className="input input-bordered w-full flex items-center justify-between"
        onClick={() => setIsOpen(o => !o)}
      >
        <span className="flex items-center space-x-2">
          {selected && <Icon path={selected.path} size={1} />}
          <span>{selected?.key || "Sélectionner une icône…"}</span>
        </span>
        <span className={`transform transition ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          {options.map(opt => (
            <li
              key={opt.key}
              className="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => {
                onChange(opt.key);
                setIsOpen(false);
              }}
            >
              <Icon path={opt.path} size={1} key={opt.path}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
