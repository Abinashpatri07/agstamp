import React from "react";
import { useCart } from "./CartContext"; // Import useCart hook
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border-b">
                <span className="text-lg">{item.name} - ${item.price} x {item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">Remove</button>
              </div>
            ))}
            <button onClick={clearCart} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Clear Cart
            </button>
          </div>
        )}
        <button onClick={() => navigate("/retail-sales")} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;

