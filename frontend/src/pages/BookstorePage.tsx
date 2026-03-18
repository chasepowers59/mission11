import { useEffect, useMemo, useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import ShoppingCart from '../components/ShoppingCart';
import type { Book, CartItem } from '../types/types';

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem('bookstore-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('bookstore-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [showToast]);

  const handleCategoryChange = (category: string) => {
    if (category === '') {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((currentCategory) => currentCategory !== category)
        : [...currentCategories, category]
    );
  };

  const handleAddToCart = (book: Book) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.book.bookId === book.bookId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.book.bookId === book.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { book, quantity: 1 }];
    });

    setToastMessage(`${book.title} added to cart`);
    setShowToast(true);
  };

  const handleUpdateQuantity = (bookId: number, change: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.book.bookId === bookId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
    [cart]
  );

  return (
    <main className="container">
      <section>
        <div className="row g-4">
          <div className="col-lg-3">
            <div className="sticky-top app-sidebar">
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />

              <div className="card shadow-sm mt-4">
                <div className="card-body">
                  <h2 className="h5">Cart Summary</h2>
                  <p className="mb-2">
                    Items in cart: <strong>{totalItems}</strong>
                  </p>
                  <p className="mb-3">
                    Total: <strong>${cartTotal.toFixed(2)}</strong>
                  </p>
                  <button
                    className="btn btn-dark w-100"
                    onClick={() => setShowCart(true)}
                    type="button"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <BookList
              selectedCategories={selectedCategories}
              cart={cart}
              onAddToCart={handleAddToCart}
              onViewCart={() => setShowCart(true)}
            />
          </div>
        </div>
      </section>

      <ShoppingCart
        cart={cart}
        showCart={showCart}
        onCloseCart={() => setShowCart(false)}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          className={`toast align-items-center text-bg-dark border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookstorePage;
