import { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';
import type { Book, BookFormData } from '../types/types';

const emptyBookForm: BookFormData = {
  bookId: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: '',
  classification: '',
  category: '',
  pageCount: 0,
  price: 0,
};

function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookForm, setBookForm] = useState<BookFormData>(emptyBookForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(buildApiUrl('/api/books/AllBooks'));

      if (!response.ok) {
        throw new Error('Failed to load books.');
      }

      const data: Book[] = await response.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError('Could not load books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setBookForm((currentBook) => ({
      ...currentBook,
      [name]:
        name === 'pageCount' || name === 'price'
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setBookForm(emptyBookForm);
    setIsEditing(false);
  };

  const handleEdit = (book: Book) => {
    setBookForm({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.isbn,
      classification: book.classification,
      category: book.category,
      pageCount: book.pageCount,
      price: book.price,
    });
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleDelete = async (bookId: number) => {
    const confirmed = window.confirm('Delete this book?');

    if (!confirmed) {
      return;
    }

    setMessage('');
    setError('');

    try {
      const response = await fetch(buildApiUrl(`/api/books/${bookId}`), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book.');
      }

      setMessage('Book deleted successfully.');
      await loadBooks();
      if (bookForm.bookId === bookId) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError('Could not delete book.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const url = isEditing
      ? buildApiUrl(`/api/books/${bookForm.bookId}`)
      : buildApiUrl('/api/books');
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookForm),
      });

      if (!response.ok) {
        throw new Error('Failed to save book.');
      }

      setMessage(isEditing ? 'Book updated successfully.' : 'Book added successfully.');
      resetForm();
      await loadBooks();
    } catch (err) {
      console.error(err);
      setError('Could not save book.');
    }
  };

  return (
    <main className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Admin Books</h2>
          <p className="text-muted mb-0">Add, edit, and delete books in the database.</p>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">{isEditing ? 'Update Book' : 'Add Book'}</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" name="title" value={bookForm.title} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input className="form-control" name="author" value={bookForm.author} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Publisher</label>
                  <input className="form-control" name="publisher" value={bookForm.publisher} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input className="form-control" name="isbn" value={bookForm.isbn} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Classification</label>
                  <input className="form-control" name="classification" value={bookForm.classification} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input className="form-control" name="category" value={bookForm.category} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Page Count</label>
                  <input className="form-control" name="pageCount" type="number" value={bookForm.pageCount} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input className="form-control" name="price" type="number" step="0.01" value={bookForm.price} onChange={handleInputChange} required />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    {isEditing ? 'Update Book' : 'Add Book'}
                  </button>
                  <button className="btn btn-outline-secondary" type="button" onClick={resetForm}>
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">Book List</h3>

              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.bookId}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.category}</td>
                          <td>${book.price.toFixed(2)}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => handleEdit(book)}>
                                Edit
                              </button>
                              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleDelete(book.bookId)}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminBooksPage;
