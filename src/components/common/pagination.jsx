import React from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) {
    return null;
  }
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a
                  onClick={() => props.onPageChange(page)}
                  className="page-link"
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default Pagination;
