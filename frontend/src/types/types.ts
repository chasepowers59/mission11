/**
 * Book interface representing a single book in the database.
 */
export type Book = {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
};

/**
 * API response interface for the /api/books endpoint.
 * Contains paginated book data and total item count.
 */
export type BookResponse = {
  books: Book[];
  totalItems: number;
};