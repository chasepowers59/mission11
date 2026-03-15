import React from 'react';
import './App.css';
import BookList from './BookList';

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
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        <section>
          <BookList />
        </section>
      </main>

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