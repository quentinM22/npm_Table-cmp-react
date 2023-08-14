import React, { ChangeEvent } from 'react';

interface SearchProps {
  setWordSearch: (word: string) => void;
  colorPrimary: string;
}

const Search= ({ setWordSearch, colorPrimary }: SearchProps ) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWordSearch(e.target.value);
  };

  return (
    <div style={{ height: "21px" }}>
      <input
        type="text"
        style={{
          height: "100%",
          padding: "0 10px 0",
          border: "none",
          borderRadius: "5px",
          background: colorPrimary,
          color: "white",
          outline: "none",
        }}
        onChange={handleSearchChange}
        placeholder=" Search here"
      />
    </div>
  );
};

export default Search;