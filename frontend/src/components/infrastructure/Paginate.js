import React from 'react';
import { Pagination } from 'react-bootstrap';

export const Paginate = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;

    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= maxVisiblePages) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            pages = [1];

            if (currentPage > 3) {
                pages.push('...');
            }

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                />

                {getPageNumbers().map((page, index) => (
                    <Pagination.Item
                        key={index}
                        active={page === currentPage}
                        onClick={() =>
                            typeof page === 'number' && onPageChange(page)
                        }
                        disabled={page === '...'}
                    >
                        {page}
                    </Pagination.Item>
                ))}

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </Pagination>
        </div>
    );
};

export default Paginate;
