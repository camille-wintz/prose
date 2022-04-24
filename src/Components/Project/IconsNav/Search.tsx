import { useState } from "react";
import { Input } from "../../Form/Input";

export const Search = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Input
      autoFocus
      type="text"
      value={search}
      onTextChange={(val) => setSearch(val)}
      label={"Search"}
    />
  );
};
