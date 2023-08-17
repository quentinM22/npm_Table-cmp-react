import React, { ChangeEvent } from 'react';

interface SelectProps {
  setElementsPerPage: (elements: number) => void;
  setCurrentPage: (page: number) => void;
  colorPrimary: string;
}

const Select = ({ setElementsPerPage, setCurrentPage, colorPrimary }: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setElementsPerPage(parseInt(e.target.value));
  };

  return (
    <>
    <select 
      aria-label='select the number of elements to display'
      onChange={handleChange}
      style={{
        background: colorPrimary,
        color: "white",
        border: "none",
        borderRadius: "5px",
        height: "21px",
        margin: "none"
      }}
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    </>
  );
};

export default Select;