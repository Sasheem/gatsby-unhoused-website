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

  return (
    <div className="pagination">
      <LeftArrow className="pagination-icon" onClick={handleLeftArrowClick} />
      <nav className="pagination-items">
        <ul>
          {pageNumbers.map(number => (
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
          ))}
        </ul>
      </nav>
      <RightArrow className="pagination-icon" onClick={handleRightArrowClick} />
    </div>
  );
};

export default Pagination;
