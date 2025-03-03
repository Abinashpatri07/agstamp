// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu } from "lucide-react";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <header className="bg-blue-500 text-white fixed top-0 left-0 w-full z-50">
//       <div className="px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-3 text-[#11295a]">
//           <Link to="/" className="w-12 h-12 bg-blue-500 flex items-center justify-center rounded-full font-bold text-2xl border-2 border-black cursor-pointer">
//             AG
//           </Link>
//           <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blueRibbon-950">AG Stamp</Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
//           <Link to="/ebay-sales" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`}>Old Products</Link>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
//         </nav>

//         {/* Login Button */}
//         <button className="bg-[#11295a] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">Login</button>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//           <Menu size={28} />
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <nav ref={menuRef} className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4 text-center font-semibold">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>About Us</Link>
//           <Link to="/ebay-sales" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Old Products</Link>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react"; // Import cart icon

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-blue-500 text-white fixed top-0 left-0 w-full z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 text-[#11295a]">
          <Link to="/" className="w-12 h-12 bg-blue-500 flex items-center justify-center rounded-full font-bold text-2xl border-2 border-black cursor-pointer">
            AG
          </Link>
          <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blueRibbon-950">AG Stamp</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
          <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
          <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
          <Link to="/ebay-sales" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`}>Old Products</Link>
          <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
          <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
        </nav>

        {/* Right Side - Login & Cart */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#11295a] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
            Login
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-white hover:text-gray-300 transition" />
            {/* Cart Count (optional) */}
            {/* <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">3</span> */}
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav ref={menuRef} className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4 text-center font-semibold">
          <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/ebay-sales" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Old Products</Link>
          <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
          <Link to="/cart" className="hover:text-black flex justify-center items-center gap-2" onClick={() => setIsOpen(false)}>
            <ShoppingCart size={24} /> Cart
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
