import { useState } from "react";
import { SearchRequest } from "../../types/shopTypes";

function Search({ onSearch }: SearchRequest) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="header_active-search">
      <div className="header_active-search__glass"></div>
      <input
        type="text"
        className="header_active-search__text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
