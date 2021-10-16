import ReactPaginate from 'react-paginate';
import { ReactComponent as PaginationArrow } from 'assets/images/arrow.svg';

import './styles.css';

type Props = {
  forcePage?: number,
  pageCount: number,
  range: number,
  onChange?: (pageNumber: number) => void
}

const Pagination = ({ forcePage, pageCount, range, onChange }: Props) => {
  return (
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-item"
        activeLinkClassName="pagination-item-active"
        previousClassName="pagination-previous"
        previousLabel={<div className="pagination-previous-container"><PaginationArrow /></div>}
        nextClassName="pagination-next"
        nextLabel={<div className="pagination-next-container"><PaginationArrow /></div>}
        disabledClassName="arrow-inactive"
        onPageChange={(items) => (onChange) ? onChange(items.selected) : {}}
        forcePage={forcePage}
      />
  )
}

export default Pagination;