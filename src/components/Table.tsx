import React, { useEffect, useState } from 'react';
import { search } from './utils/function';
import { Select } from './Select';
import { Search } from './Search';
import { Pagination } from './Pagination';

export interface TableProps {
  title: string;
  arrayElement: object[];
  attributes: string[];
  colorPrimary: string;
  colorSecondary: string;
}

const Table = ({
  title,
  arrayElement,
  attributes,
  colorPrimary,
  colorSecondary,
}: TableProps) => {
  const [thValue, setTableThValue] = useState<string[]>([]);
  const [arrElements, setArrElements] = useState<any[]>(arrayElement);

  useEffect(() => {
    if (arrayElement.length > 0) {
      const keys = Object.keys(arrayElement[0]);
      setTableThValue(keys);
      setArrElements(arrayElement);
    } else {
      setArrElements([]);
    }
  }, [arrayElement]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elementsPerPage, setElementsPerPage] = useState<number>(10);

  const indexLastItem = currentPage * elementsPerPage;
  const indexFirstItem = indexLastItem - elementsPerPage;
  const currentItems = arrElements.slice(indexFirstItem, indexLastItem);

  // Search
  const [wordSearch, setWordSearch] = useState<string>('');

  useEffect(() => {
    if (arrayElement.length > 0) {
      const newArr = arrayElement.filter(item =>
        search(wordSearch, item, attributes)
      );
      wordSearch.length >= 1
        ? setArrElements(newArr)
        : setArrElements(arrayElement);
      setCurrentPage(1);
    } else {
      setArrElements([]);
    }
  }, [wordSearch]);

  // Sort
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Triez les éléments en fonction de la clé et de l'ordre de tri
  useEffect(() => {
    
      if (sortKey && sortOrder) {
        if (arrayElement.length > 0) {
        const sortedElements = [...arrElements].sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
        setArrElements(sortedElements);
    } else {
        setSortKey(null);
        setSortOrder('asc');
        setArrElements([]);
      }
      }
    
  }, [arrElements, sortKey, sortOrder]);
  return (
    <fieldset
      style={{
        border: `3px solid ${colorSecondary}`,
        borderRadius: '5px',
        padding: '50px',
        width: 'calc(100% - 100px)',
      }}
    >
      <legend>
        <h2>{title}</h2>
      </legend>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Select
          setElementsPerPage={setElementsPerPage}
          setCurrentPage={setCurrentPage}
          colorPrimary={colorPrimary}
        />
        <Search setWordSearch={setWordSearch} colorPrimary={colorPrimary} />
      </div>

      <table
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          border: `1px solid ${colorPrimary}`,
          backgroundColor: '#ffffff',
          width: '100%',
          textAlign: 'center',
          borderCollapse: 'collapse',
        }}
      >
        <thead
          style={{
            background:
              'linear-gradient(to bottom, #ffffff 0%, #ffffff 66%, #ffffff 100%)',
            borderBottom: `2px solid ${colorPrimary}`,
          }}
        >
          <tr>
            {thValue.map((th, index) => (
              <th
                key={index}
                onClick={() => handleSort(th)}
                style={{
                  color: colorPrimary,
                  cursor: 'pointer',
                  border: `1px solid ${colorPrimary}`,
                  padding: '6px 4px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderLeft: ` 2px solid ${colorSecondary}`,
                }}
              >
                {th}{' '}
                {sortKey === th ? (
                  <span
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                ) : (
                  <span
                    style={{
                      color: 'lightgray',
                      fontSize: '14px',
                    }}
                  >
                    ▲▼
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tfoot
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ffffff',
            padding: '10px',
            background: `linear-gradient(to bottom, ${colorSecondary} 0%, #70acc2 66%, #60a3bc 100%)`,
            borderTop: `2px solid ${colorSecondary}`,
          }}
        >
          {arrElements && arrElements.length > 0 && (
            <Pagination
              currentPage={currentPage}
              limit={arrElements.length}
              total={elementsPerPage}
              setCurrentPage={setCurrentPage}
              colorPrimary={colorPrimary}
            />
          )}
        </tfoot>
        <tbody>
          {arrElements && arrElements.length >= 1 ? (
            <>
              {currentItems &&
                currentItems.map((elements: any, index: number) => (
                  <tr
                    key={index}
                    style={
                      index % 2 === 0 ? { background: colorSecondary } : {}
                    }
                  >
                    {Object.values(elements).map(
                      (el: any, innerIndex: number) => (
                        <td
                          key={innerIndex}
                          style={{
                            border: `1px solid ${colorPrimary}`,
                            padding: '3px 2px',
                            fontSize: '16px',
                          }}
                        >
                          {el}
                        </td>
                      )
                    )}
                  </tr>
                ))}
            </>
          ) : (
            <tr>
              {' '}
              <td colSpan={9}>No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
    </fieldset>
  );
};

export default Table;
