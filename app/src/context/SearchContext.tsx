import React, { createContext, useState } from "react";

interface SearchInputType {
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchContextProviderType {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchInputType>({
  searchParam: "",
  setSearchParam: () => {},
});

const SearchContextProvider = ({ children }: SearchContextProviderType) => {
  const [searchParam, setSearchParam] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchParam, setSearchParam }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };

export default SearchContextProvider;
