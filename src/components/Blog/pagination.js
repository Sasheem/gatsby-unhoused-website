import React from 'react';

import './blog.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
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
  );
};

export default Pagination;
