import React from "react";
import { IoSearch } from "react-icons/io5";
import Input from "../InputField";

export const SearchBar = () => {
  return (
    <div className="search-bar w-4/5 flex items-center gap-2 border-2 border-gray-200 rounded-md px-2 bg-white">
      <IoSearch className="text-gray-500 text-2xl w-10" />
      {/* <input type="text" className='w-full' /> */}
      <Input
        label=""
        placeholder="Search tasks..."
        type="text"
        name="search"
        value=""
        onChange={() => {}}
        styleClass="w-full h-full border-none outline-none"
        error={false}
      />
    </div>
  );
};
