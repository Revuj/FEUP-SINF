import { useMemo, useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/Pagination.css';

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState(null);
  const set = new Set();

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  useEffect(() => {
    set.clear();
    const offset = 5;
    set.add(1);
    set.add(totalPages);

    for (let i = 0; i < offset; i++) {
      set.add(Math.min(1 + i, totalPages));
      set.add(Math.max(currentPage - i, 1));
      set.add(Math.min(currentPage + i, totalPages));
      set.add(Math.max(totalPages - i, 1));
    }

    setPages([...set].sort((a, b) => a - b));
    console.log(pages);
  }, [currentPage, totalPages]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      />
      {pages &&
        pages.map((page) => {
          return (
            <li
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
              style={{ marginRight: '1rem' }}
            >
              {page}
            </li>
          );
        })}

      <Pagination.Next
        onClick={() => {
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
