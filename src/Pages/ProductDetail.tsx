// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "./CartContext"; // Import cart context
// import { img1, img2, img3 } from "../assets/image";

// const products = [
//   { id: 1, name: "Product 1", image: img1, price: 100 },
//   { id: 2, name: "Product 2", image: img2, price: 150 },
//   { id: 3, name: "Product 3", image: img3, price: 120 },
//   { id: 4, name: "Product 4", image: img2, price: 200 },
// ];

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { addToCart } = useCart(); // Use cart context
//   const product = products.find((p) => p.id === parseInt(id!));

//   if (!product) {
//     return <h2 className="text-center text-red-500 text-2xl">Product Not Found</h2>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
//       <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl h-auto md:h-[550px]">
        
//         {/* Left Side - Product Image */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <img src={String(product.image)} alt={product.name} className="w-full max-w-[400px] h-[400px] object-contain rounded-lg" />
//         </div>

//         {/* Right Side - Product Details */}
//         <div className="w-full md:w-1/2 md:pl-10 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold">{product.name}</h2>
//           <p className="text-2xl text-gray-700 mt-3">Price: <span className="font-semibold">${product.price}</span></p>

//           {/* Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-6">
//             <button
//               onClick={() => addToCart({ ...product, quantity: 1 })}
//               className="px-8 py-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 w-full sm:w-auto"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => navigate("/cart")}
//               className="px-8 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 w-full sm:w-auto"
//             >
//               Go to Cart
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Import cart context
import { img1, img2, img3 } from "../assets/image";

const products = [
  { id: 1, name: "Product 1", image: img1, price: 100 },
  { id: 2, name: "Product 2", image: img2, price: 150 },
  { id: 3, name: "Product 3", image: img3, price: 120 },
  { id: 4, name: "Product 4", image: img2, price: 200 },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use cart context
  const product = products.find((p) => p.id === parseInt(id!));

  const [showPopup, setShowPopup] = useState(false); // State for popup

  if (!product) {
    return <h2 className="text-center text-red-500 text-2xl">Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setShowPopup(true); // Show popup

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl h-auto md:h-[550px]">
        
        {/* Left Side - Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={String(product.image)} alt={product.name} className="w-full max-w-[400px] h-[400px] object-contain rounded-lg" />
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-1/2 md:pl-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold">{product.name}</h2>
          <p className="text-2xl text-gray-700 mt-3">Price: <span className="font-semibold">${product.price}</span></p>

          {/* Buttons Section */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6 relative">
            {/* Success Popup (Positioned Above Add to Cart Button) */}
            {showPopup && (
              <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 opacity-100">
                Item added successfully!
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700 w-full sm:w-auto"
            >
              Add to Cart
            </button>

            {/* Go to Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 w-full sm:w-auto"
            >
              Go to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;

