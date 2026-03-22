import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import AdminBooksPage from './pages/AdminBooksPage';
import BookstorePage from './pages/BookstorePage';

/**
 * Main App component for Hilton's Online Bookstore.
 * Displays the header, main content with BookList component, and footer.
 */
function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="bg-dark text-white p-4 mb-4">
        <div className="container">
          <h1>Hilton's Online Bookstore</h1>
          <p>Building the next Amazon, one assignment at a time.</p>
          <nav className="nav nav-pills mt-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-white'}`
              }
            >
              Bookstore
            </NavLink>
            <NavLink
              to="/adminbooks"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : 'text-white'}`
              }
            >
              Admin Books
            </NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<BookstorePage />} />
        <Route path="/adminbooks" element={<AdminBooksPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer */}
      <footer className="container mt-5 py-3 border-top">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a 
              href="https://react.dev" 
              className="nav-link px-2 text-muted" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              React Docs
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="https://getbootstrap.com" 
              className="nav-link px-2 text-muted" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Bootstrap
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
