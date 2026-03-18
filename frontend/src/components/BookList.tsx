import { useEffect, useState } from 'react';
import type { Book, BookResponse, CartItem } from '../types/types';

type BookListProps = {
  selectedCategories: string[];
  cart: CartItem[];
  onAddToCart: (book: Book) => void;
  onViewCart: () => void;
};

/**
 * BookList component displays a paginated, sortable list of books from the API.
 * Features:
 * - Pagination: Configurable items per page (5, 10, 20)
 * - Sorting: Sort by Title, Author, or Price
 * - Responsive: Bootstrap table layout
 */
const BookList = ({
  selectedCategories,
  cart,
  onAddToCart,
  onViewCart,
}: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<string>('Title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch books from the API whenever page, pageSize, or sortBy changes.
   */
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: pageSize.toString(),
      sortBy,
    });

    selectedCategories.forEach((category) => {
      params.append('bookCategories', category);
    });

    fetch(`/api/books?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then((data: BookResponse) => {
        setBooks(data.books);
        setTotalCount(data.totalItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch books failed:', err);
        setError('Failed to load books. Please check your internet connection.');
        setLoading(false);
      });
  }, [page, pageSize, sortBy, selectedCategories]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Professor Hilton's Bookstore</h2>
          <p className="text-muted mb-0">
            {selectedCategories.length > 0
              ? `Showing books in ${selectedCategories.join(', ')}`
              : 'Showing all books'}
          </p>
        </div>

        <button className="btn btn-outline-dark" onClick={onViewCart} type="button">
          View Cart <span className="badge rounded-pill text-bg-dark ms-2">{cartCount}</span>
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Results Per Page</label>
          <select
            className="form-select"
            aria-label="Number of books per page"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            aria-label="Sort books"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="Title">Title (A-Z)</option>
            <option value="Author">Author (A-Z)</option>
            <option value="Price">Price (Low to High)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Pages</th>
                <th>Price</th>
                <th></th>
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
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => onAddToCart(book)}
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && books.length === 0 && !error && (
        <div className="alert alert-info" role="alert">
          No books found.
        </div>
      )}

      {!loading && totalPages > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-outline-primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            type="button"
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
            type="button"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
