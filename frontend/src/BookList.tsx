import { useEffect, useState } from 'react';
import type { Book, BookResponse } from './types/types';

/**
 * BookList component displays a paginated, sortable list of books from the API.
 * Features:
 * - Pagination: Configurable items per page (5, 10, 20)
 * - Sorting: Sort by Title, Author, or Price
 * - Responsive: Bootstrap table layout
 */
const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<string>("Title");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch books from the API whenever page, pageSize, or sortBy changes.
   */
  useEffect(() => {
    setLoading(true);
    setError(null);
// use normal route of /api/controller, but add query params for pagination and sorting -- PASSED TO CONTROLLER 
    fetch(`/api/books?pageNum=${page}&pageSize=${pageSize}&sortBy=${sortBy}`) // QUERY PARAMS: pageNum, pageSize, sortBy, use =${variable} to insert values
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then((data: BookResponse) => {
        setBooks(data.books); // our response has 2 props, books and total items so use data.books
        setTotalCount(data.totalItems);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch books failed:", err);
        setError("Failed to load books. Please check your internet connection.");
        setLoading(false);
      });
  }, [page, pageSize, sortBy]); // DEPENDENCIES: page, pageSize, sortBy - re-run effect when these change Updates the page 

  // Calculate total pages, then what we are returning in the UI for pagination controls
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Professor Hilton's Bookstore</h2>

      {/* Controls: Results Per Page and Sorting */}
      <div className="row mb-3">
        {/* Results Per Page Dropdown */}
        <div className="col-md-3">
          <label className="form-label">Results Per Page</label>
          <select
            className="form-select"
            aria-label="Number of books per page"
            value={pageSize}
            onChange={(e) => { // setPageSize is setter
              setPageSize(Number(e.target.value)); // Update page size, use Number to convert string to integer
              setPage(1); // Reset to first page, defaulted to page 1, with 5 results.
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="col-md-3">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            aria-label="Sort books"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1); // Reset to first page
            }}
          >
            <option value="Title">Title (A-Z)</option>
            <option value="Author">Author (A-Z)</option>
            <option value="Price">Price (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Books Table */}
      {!loading && books.length > 0 && (
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Pages</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.classification}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Results Message */}
      {!loading && books.length === 0 && !error && (
        <div className="alert alert-info" role="alert">
          No books found.
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-outline-primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &laquo; Previous
          </button>

          <span className="fw-bold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;