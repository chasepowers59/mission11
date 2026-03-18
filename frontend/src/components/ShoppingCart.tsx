import type { CartItem } from '../types/types';

type ShoppingCartProps = {
  cart: CartItem[];
  showCart: boolean;
  onCloseCart: () => void;
  onUpdateQuantity: (bookId: number, change: number) => void;
};

function ShoppingCart({
  cart,
  showCart,
  onCloseCart,
  onUpdateQuantity,
}: ShoppingCartProps) {
  const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${showCart ? 'show' : ''}`}
        tabIndex={-1}
        aria-labelledby="shoppingCartLabel"
        style={{ visibility: showCart ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <div>
            <h2 className="offcanvas-title mb-1" id="shoppingCartLabel">
              Shopping Cart
            </h2>
            <p className="text-muted mb-0">Review your books before you continue.</p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onCloseCart}
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="mb-3">
            <button className="btn btn-outline-primary" onClick={onCloseCart} type="button">
              Continue Shopping
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="alert alert-info mb-0">Your cart is empty.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Book</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {cart.map((item) => (
                    <tr key={item.book.bookId}>
                      <td>
                        <div className="fw-semibold">{item.book.title}</div>
                        <div className="text-muted small">{item.book.author}</div>
                      </td>
                      <td>${item.book.price.toFixed(2)}</td>
                      <td>
                        <div className="d-inline-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.book.bookId, -1)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="fw-semibold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onUpdateQuantity(item.book.bookId, 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-end fw-bold">
                      Total
                    </td>
                    <td className="fw-bold">${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
      {showCart && <div className="offcanvas-backdrop fade show" onClick={onCloseCart}></div>}
    </>
  );
}

export default ShoppingCart;
