// import React from "react";
// import { useCart } from "./CartContext"; // Import useCart hook
// import { useNavigate } from "react-router-dom";

// const Cart: React.FC = () => {
//   const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   // Calculate total price
//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-600 text-center">Your cart is empty.</p>
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
//                 onClick={() => navigate("/payment", { state: { cart, total } })}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 onClick={() => navigate("/retail-sales")}
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useCart } from "./CartContext"; // Import useCart hook
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-contain rounded-lg border border-gray-300"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mb-1 sm:mb-2">Price: ${product.price.toFixed(2)}</p>
                <p className="mb-1 sm:mb-2 font-bold">Total: ${(product.price * product.quantity).toFixed(2)}</p>

                {/* Quantity Controls */}
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

              {/* Remove Item Button */}
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Buttons Section */}
          <div className="mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => navigate("/payment", { state: { cart, total } })}
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

      {/* Continue Shopping Button Always Visible */}
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
