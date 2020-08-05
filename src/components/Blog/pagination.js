import React, { useState, useEffect } from 'react';

import LeftArrow from '../../assets/chevron-left-solid.svg';
import RightArrow from '../../assets/chevron-right-solid.svg';

import './blog.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const [lastPage, setLastPage] = useState(0);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (pageNumbers.length !== 0) {
      setLastPage(pageNumbers.length);
    }
    return () => {
      while (pageNumbers.length > 0) {
        pageNumbers.pop();
      }
    };
  }, [pageNumbers]);

  function handleRightArrowClick() {
    if (currentPage !== lastPage) {
      console.log(`handleRightClick firing, going to page ${currentPage + 1}`);
      paginate(currentPage + 1);
    }
  }
  function handleLeftArrowClick() {
    if (currentPage !== 1) {
      console.log(`handleLeftClick firing, going to page ${currentPage - 1}`);
      paginate(currentPage - 1);
    }
  }

  const firstNumber = pageNumbers[0];
  const lastNumber = pageNumbers[pageNumbers.length - 1];

  return (
    <div className="pagination">
      <LeftArrow className="pagination-icon" onClick={handleLeftArrowClick} />
      <nav className="pagination-items">
        <ul>
          {currentPage !== firstNumber && (
            <li>
              <a
                onClick={() => paginate(firstNumber)}
                className="pagination-link"
              >
                {firstNumber}
              </a>
            </li>
          )}
          {currentPage !== firstNumber && currentPage !== firstNumber + 1 && (
            <span>...</span>
          )}
          {/* Only render current page and two items before and after */}
          {pageNumbers.map(number =>
            number === currentPage ||
            (number === currentPage + 2 && number !== lastNumber) ||
            (number === currentPage + 1 && number !== lastNumber) ||
            (number === currentPage - 2 && number !== firstNumber) ||
            (number === currentPage - 1 && number !== firstNumber) ? (
              <li key={number}>
                <a
                  onClick={() => paginate(number)}
                  className={
                    currentPage === number
                      ? 'pagination-link pagination-active'
                      : 'pagination-link'
                  }
                >
                  {number}
                </a>
              </li>
            ) : null
          )}
          {currentPage !== lastNumber && currentPage !== lastNumber - 1 && (
            <span>...</span>
          )}
          {currentPage !== lastNumber && (
            <li>
              <a
                onClick={() => paginate(lastNumber)}
                className="pagination-link"
              >
                {lastNumber}
              </a>
            </li>
          )}
        </ul>
      </nav>
      <RightArrow className="pagination-icon" onClick={handleRightArrowClick} />
    </div>
  );
};

export default Pagination;
