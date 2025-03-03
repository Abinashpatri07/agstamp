

// import React, { useState } from "react";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     image: "/src/Pages/image1.jpg", // Update path if using public folder
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     image: "/src/Pages/image3.jpg",
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     image: "/src/Pages/image1.jpg",
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     image: "/src/Pages/image2.jpg",
//   },
// ];

// const RetailSales: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* Search Bar */}
//       <div className="max-w-2xl mx-auto mb-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between items-center w-full h-80"
//           >
//             {/* Image Container */}
//             <div className="w-full h-48 flex items-center justify-center">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-contain rounded-lg"
//               />
//             </div>

//             {/* Product Name */}
//             <h2 className="text-xl font-semibold text-center text-gray-800 h-10 flex items-center justify-center">
//               {product.name}
//             </h2>

//             {/* Details Button */}
//             <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//               Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default RetailSales;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "./image1.jpg"
import img2 from "./image2.jpg"
import img3 from "./image3.jpg"
const products = [
  { id: 1, name: "Product 1", image: {img1}, price: 100 },
  { id: 2, name: "Product 2", image: {img2}, price: 150 },
  { id: 3, name: "Product 3", image: {img3}, price: 120 },
  { id: 4, name: "Product 4", image: {img2}, price: 200 },
];

const RetailSales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between items-center w-full h-80"
          >
            <div className="w-full h-48 flex items-center justify-center">
              <img
                src={String(product.image)}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-800 h-10 flex items-center justify-center">
              {product.name}
            </h2>

            <Link to={`/product/${product.id}`}>
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailSales;
