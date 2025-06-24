import { useState, useRef, useEffect } from "react";

export default function FilterByCategories({
  catList,
  selectedCat,
  setSelectedCat,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const filtered = catList.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  //! Ref pour détecter les clics en dehors
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
      {/* Search input */}
      <input
        type="text"
        placeholder="Filtrer ..."
        className="input input-bordered w-full"
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
      />
      {/* Select */}
      {isOpen && (
        <ul
          className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto"
          value={selectedCat}
        >
          {/* <li
            className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
            onClick={() => {
              setSelectedCat(null);
              setIsOpen(false);
            }}
          >
            —Toutes les Catégories—
          </li> */}
          {filtered.map((cat) => (
            <li
              key={cat.id}
              value={cat.id}
              className="px-4 py-1 hover:bg-primary hover:text-white cursor-pointer"
              onClick={(e) => {
                setSelectedCat(parseInt(e.target.value));
                setIsOpen(false);
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
