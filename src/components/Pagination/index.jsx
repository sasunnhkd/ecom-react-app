import React from 'react';

const Pagination = ({ itemPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  

  return (
    <nav className="col-xl-9 col-lg-8">
      <ul className='pagination pagination-lg justify-content-center'>
        {pageNumbers.map(number => {
            const classOfLi = (number == currentPage) ? 'page-item active' : 'page-item'
            return (
          <li key={number} className={classOfLi}>
            <a onClick={() => paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        )})}
      </ul>
    </nav>
  );
};

export default Pagination;