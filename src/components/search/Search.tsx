import { useEffect, useState } from "react";
import { SearchRequest } from "../../types/shopTypes";

function Search({ onSearch }: SearchRequest) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [onSearch, searchTerm]);

  return (
    <div className="header_active-search">
      <div className="header_active-search__glass"></div>
      <input
        type="text"
        className="header_active-search__text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;
