
// import React from "react";
// import { useCart } from "./CartContext"; // Import useCart hook
// import { useNavigate } from "react-router-dom";

// const Cart: React.FC = () => {
//   const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   // Calculate total price
//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 ">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

//       {cart.length === 0 ? (
//         <div className="text-center">
//           <p className="text-gray-600">Your cart is empty.</p>
//         </div>
//       ) : (
//         <div>
//           {cart.map((product) => (
//             <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
//               {/* Product Image */}
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
//               />

//               {/* Product Details */}
//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold">{product.name}</h2>
//                 <p className="mb-1 sm:mb-2">Price: ${product.price.toFixed(2)}</p>
//                 <p className="mb-1 sm:mb-2 font-bold">Total: ${(product.price * product.quantity).toFixed(2)}</p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center space-x-2">
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                     onClick={() => updateQuantity(product.id, -1)}
//                   >
//                     -
//                   </button>
//                   <span className="text-lg">{product.quantity}</span>
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                     onClick={() => updateQuantity(product.id, 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Remove Item Button */}
//               <button
//                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                 onClick={() => removeFromCart(product.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Total & Buttons Section */}
//           <div className="mt-4 sm:mt-6">
//             <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={() => navigate("/paymentmethod", { state: { cart, total } })}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Continue Shopping Button Always Visible */}
//       <div className="mt-6 flex justify-center">
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() => navigate("/retail-sales")}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [shippingOption, setShippingOption] = useState<string>(""); // Default empty
  const [shippingCost, setShippingCost] = useState<number>(0); // Default shipping cost
  const [shippingError, setShippingError] = useState<string>(""); // Error message state

  // Calculate total price
  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  
  // Calculate total with shipping
  const total = subtotal + shippingCost;

  // Handle shipping option change
  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setShippingOption(option);
    setShippingError(""); // Clear error when selection changes
    
    // Update shipping cost based on selection
    switch(option) {
      case "us":
        setShippingCost(5);
        break;
      case "worldwide":
        setShippingCost(25);
        break;
      default:
        setShippingCost(0);
    }
  };

  // Handle checkout with validation
  const handleCheckout = () => {
    if (!shippingOption) {
      setShippingError("Please select a shipping option");
      return;
    }
    navigate("/paymentmethod", { state: { cart, total, shippingOption } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-contain rounded-lg border border-gray-300"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mb-1 sm:mb-2">Price: ${product.price.toFixed(2)}</p>
                <p className="mb-1 sm:mb-2 font-bold">Total: ${(product.price * product.quantity).toFixed(2)}</p>

                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-lg">{product.quantity}</span>
                  <button
                    className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Shipping Options Section */}
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Shipping Options <span className="text-red-500">*</span></h2>
            <select
              value={shippingOption}
              onChange={handleShippingChange}
              className={`ml-2 p-1 border ${shippingError ? "border-red-500" : "border-gray-300"} rounded-md`}
              required
            >
              <option value="">Select Shipping Option</option>
              <option value="us">US Shipping: $5</option>
              <option value="worldwide">Worldwide Shipping: $25</option>
            </select>
            {shippingError && (
              <p className="text-red-500 text-sm mt-1">{shippingError}</p>
            )}
          </div>

          {/* Total & Buttons Section */}
          <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
            <div className="mb-2">
              <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-gray-600">Shipping: ${shippingCost.toFixed(2)}</p>
              <h2 className="text-lg sm:text-xl font-bold mt-2">Total: ${total.toFixed(2)}</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${!shippingOption ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleCheckout}
                disabled={!shippingOption}
              >
                Checkout
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/retail-sales")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
