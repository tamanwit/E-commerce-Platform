import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartItem = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    handlePayment,
    order,
    orderPlaced,
  } = useCart();
  const toProducts = () => navigate("/products");

  if (orderPlaced) {
    return (
      <div>
        <h1>Order Placed Successfully 🎉</h1>
        <p>Payment ID: {order.paymentId}</p>
        <h2>Items</h2>
        {order.items.map((item) => (
          <div key={item.product._id}>
            <p>
              {item.product.name} × {item.quantity}
            </p>
            <p>₹{item.product.price * item.quantity}</p>
          </div>
        ))}
        <h2>Total: ₹{order.total}</h2>
        <button onClick={toProducts}>Back to Products</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={toProducts}>Back to Products</button>
      {cartItems.length === 0 ? (
        <p>No items added!</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              {item.product.name} — ₹{item.product.price}
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.product._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h1>Product Summary</h1>
        <p>Item Count: {totalItems}</p>
        <p>Amount : {subtotal}/-</p>
      </div>
      <div>
        <button onClick={handlePayment}>Place Order</button>
      </div>
    </div>
  );
};

export default CartItem;
