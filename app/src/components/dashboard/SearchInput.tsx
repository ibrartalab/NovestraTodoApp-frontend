import { IoSearch } from "react-icons/io5";
import Input from "../Input";
import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const SearchInput = () => {
  const { searchParam, setSearchParam } = useContext(SearchContext);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParam(event.target.value);
  };

  return (
    <div className="search-bar w-full h-10 flex items-center gap-2 border-2 border-gray-200 rounded-md px-2 bg-white">
      <IoSearch className="text-gray-500 text-2xl w-10" />
      <Input
        label=""
        placeholder="Search tasks..."
        type="text"
        name="search"
        value={searchParam}
        onChange={handleSearchInputChange}
        styleClass="w-full h-full border-none outline-none"
        error={false}
      />
    </div>
  );
};
