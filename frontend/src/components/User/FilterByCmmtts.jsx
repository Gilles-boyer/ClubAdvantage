import { useState, useRef, useEffect } from "react";

export default function FilterByCmmtts({
  committees,
  selectedCom,
  setSelectedCom,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filtre à la volée
  const filtered = committees.filter((com) =>
    com.name.toLowerCase().includes(search.toLowerCase())
  );

  // Ref pour détecter les clics en dehors
  const wrapperRef = useRef(null);
  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md rounded" ref={wrapperRef}>
      {/* Le champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="input input-bordered w-full"
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
      />

      {/* La liste déroulante */}
      {isOpen && (
        <ul
          className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto"
          value={selectedCom}
        >
          <li
            className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
            onClick={() => {
              setSelectedCom(null);
              setIsOpen(false);
            }}
          >
            —Toutes les CSE—
          </li>
          {filtered.map((com) => (
            <li
              key={com.id}
              value={com.id}
              className="px-4 py-1 hover:bg-primary hover:text-white cursor-pointer"
              onClick={(e) => {
                setSelectedCom(parseInt(e.target.value));
                setIsOpen(false);
              }}
            >
              {com.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
