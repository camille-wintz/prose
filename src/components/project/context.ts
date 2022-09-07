import React from "react";

export const SearchContext = React.createContext<{
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
}>({ showSearch: false, setShowSearch: () => {} });
