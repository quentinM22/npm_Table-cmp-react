import React, { useEffect, useState } from 'react';
import { range } from '../utils/function';
import PaginationItem from './PaginationItem/PaginationItem';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  limit: number;
  total: number;
  colorPrimary: string;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  limit,
  total,
  colorPrimary,
}: PaginationProps) => {
  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrevious, setShowPrevious] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const pageCount = Math.ceil(limit / total);

  const pages = range(1, pageCount);
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    
    if(pageCount === 1 ){
      setShowNext(false)
      setShowPrevious(false)
      setCurrentPage(1)
    } else {
      currentPage === pageCount ? setShowNext(false) : setShowNext(true);
      currentPage === 1 ? setShowPrevious(false) : setShowPrevious(true);
    }
  }, [currentPage, pageCount]);

  
  return (
    <tr>
      <td colSpan={9} style={{ fontSize: '14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 5px 0',
            textAlign: 'right',
          }}
        >
          {showPrevious && (
            <button
              onClick={handlePrevious}
              style={{
                border: "none",
                display: 'inline-block',
                background: colorPrimary,
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            >
              &laquo;
            </button>
          )}

          <ul
            style={{
              listStyle: 'none',
              padding: ' 0 5px 0',
              display: 'flex',
            }}
          >
            <PaginationItem
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesLength={pages.length}
              setErrorMsg={setErrorMsg}
              colorPrimary={colorPrimary}
            />
          </ul>
          {showNext && (
            <button
              onClick={handleNext}
              style={{
                border: "none",
                display: 'inline-block',
                background: colorPrimary,
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            >
              &raquo;
            </button>
          )}
        </div>
        {errorMsg && <small style={{ color: 'white' }}>Page Not Found</small>}
      </td>
    </tr>
  );
};

export default Pagination;