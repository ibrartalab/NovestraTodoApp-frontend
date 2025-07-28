import React, { createContext, useState } from "react";

type filters = "all" | "active" | "completed";

interface SearchInputType {
  searchParam: string;
  filters: filters;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  setFilters: React.Dispatch<React.SetStateAction<filters>>;
}

interface SearchContextProviderType {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchInputType>({
  searchParam: "",
  filters: "all",
  setFilters: () => {},
  setSearchParam: () => {},
});

const SearchContextProvider = ({ children }: SearchContextProviderType) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [filters, setFilters] = useState<filters>("all");

  return (
    <SearchContext.Provider value={{ searchParam,filters,setFilters, setSearchParam }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };

export default SearchContextProvider;
