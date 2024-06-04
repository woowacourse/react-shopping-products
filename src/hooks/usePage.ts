import { useState } from 'react';

import { FIRST_PAGE, GAP_WITH_FIRST_PAGE } from '../constants/pagination';

export default function usePage() {
  const [page, setPage] = useState(FIRST_PAGE);

  const increasePage = () => {
    setPage((prevPage) =>
      prevPage === FIRST_PAGE ? prevPage + GAP_WITH_FIRST_PAGE : prevPage + 1,
    );
  };

  const decreasePage = () => {
    setPage((prevPage) =>
      prevPage === FIRST_PAGE + GAP_WITH_FIRST_PAGE ? prevPage - GAP_WITH_FIRST_PAGE : prevPage - 1,
    );
  };

  const resetPage = () => {
    setPage(FIRST_PAGE);
  };

  return { page, increasePage, decreasePage, resetPage };
}
