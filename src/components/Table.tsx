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

  const [mobile, setMobile] = useState<boolean>(false);
  let isBrowser = typeof window !== "undefined";
  useEffect(() => {
    const checkWindowWidth = () => {
      if (isBrowser) {
        if (window.innerWidth <= 1023) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      }
    };
  
    // Vérifie la largeur de la fenêtre lors du montage initial
    checkWindowWidth();
     // Ajoute un gestionnaire d'événement pour la largeur de la fenêtre
  window.addEventListener("resize", checkWindowWidth);

  // Nettoie le gestionnaire d'événement lors du démontage du composant
  return () => {
    window.removeEventListener("resize", checkWindowWidth);
  };
  }, []);

  return (
    <fieldset
      style={{
        border: `3px solid ${colorPrimary}`,
        borderRadius: "5px",
        width: "calc(100% - 20px)",
        padding: "0 10px 0"
      }}
    >
      <legend style={{
        color: colorPrimary,
        fontSize: "24px"
      }}>
        {title}
      </legend>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 0 10px"
        }}
      >
        <Select
          setElementsPerPage={setElementsPerPage}
          setCurrentPage={setCurrentPage}
          colorPrimary={colorPrimary}
        />
        <Search setWordSearch={setWordSearch} colorPrimary={colorPrimary} />
      </div>

      {mobile ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap",

            height: "75vh",
            overflowY: "scroll",
          }}
        >
          {arrElements && arrElements.length >= 1 ? (
            <>
              {currentItems.map((elements, index) => (
                <div
                  key={index}
                  style={{
                    background: index % 2 === 0 ? colorSecondary : 'none',
                    display: "flex",
                    flexFlow: "row wrap",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    {Object.keys(elements).map((e, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "3px 2px",
                          fontSize: "16px",
                          width: "calc(100% - 4px)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {e} :
                      </div>
                    ))}
                  </div>
                  <div style={{ width: "50%" }}>
                    {Object.values(elements).map((e: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          padding: "3px 2px",
                          fontSize: "16px",
                          width: "calc(100% - 4px)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>
              <td colSpan={9}>No data available in table</td>
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: "100%", borderCollapse: "collapse" }}>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              border: `1px solid ${colorPrimary}`,
              backgroundColor: "#ffffff",
              textAlign: "center",
              borderCollapse: "collapse",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(to bottom, #ffffff 0%, #ffffff 66%, #ffffff 100%)",
                borderBottom: `2px solid ${colorPrimary}`,
                width: "100%",
                display: "flex",
              }}
            >
              {thValue.map((th, index) => (
                <div
                  key={index}
                  onClick={() => handleSort(th)}
                  style={{
                    color: colorPrimary,
                    cursor: "pointer",
                    border: `1px solid ${colorPrimary}`,
                    padding: "3px 2px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderLeft: `2px solid ${colorSecondary}`,
                    width: `calc(100% / ${thValue.length})`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {th}{" "}
                  {!mobile && (
                    sortKey === th ? (
                      <span
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "lightgray",
                          fontSize: "14px",
                        }}
                      >
                        ▲▼
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row wrap",
              }}
            >
              {arrElements && arrElements.length >= 1 ? (
                <>
                  {currentItems.map((elements, index) => (
                    <div
                      key={index}
                      style={{
                        background: index % 2 === 0 ? colorSecondary : 'none',
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      {Object.values(elements).map((el: any, index: number) => (
                        <div
                          key={index}
                          style={{
                            border: `1px solid ${colorPrimary}`,
                            padding: "3px 2px",
                            fontSize: "16px",
                            width: `calc(100% / ${thValue.length})`,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <td colSpan={9}>No data available in table</td>
                </div>
              )}
            </div>
          </div>

         
        </div>
      )}
	   <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ffffff",
              background: `linear-gradient(to bottom, ${colorSecondary} 0%, #70acc2 66%, #60a3bc 100%)`,
              borderTop: `2px solid ${colorSecondary}`,
              marginBottom: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px"
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
          </div>
    </fieldset>
  );
};

export default Table;
