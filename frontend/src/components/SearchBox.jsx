import React, { useState, useRef , useEffect} from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/searchSlice.js";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(setSearchQuery(query));
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [dispatch, query]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="w-80">
      <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#808080"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search Tasks"
          className="ml-3 w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBox;
