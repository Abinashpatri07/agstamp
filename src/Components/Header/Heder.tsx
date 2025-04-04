// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, ShoppingCart } from "lucide-react"; // Import cart icon
// import { useCart } from "../../Pages/CartContext";
// import { logo } from "../../assets/image";

//  // Import useCart hook

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const menuRef = useRef<HTMLDivElement>(null);
//   const { cart } = useCart(); // Get cart data

//   // Calculate total cart items
//   const cartCount = cart.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

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
        
//         {/* <div className="flex flex-col items-center space-x-3 text-[#11295a]"> */}
//           <Link to="/" className="w-30 h-18 bg-white flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
//             <img src={logo} alt="Logo" className="w-full h-full object-contain" />
//           </Link>
//           {/* <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blueRibbon-950">
//             AG Stamp
//           </Link> */}
//         {/* </div> */}



//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
//           <a href="http://agstamp.com/retailsales.htm" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} target="_blank" onClick={() => setIsOpen(false)}>Old Products</a>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
//         </nav>

//         {/* Right Side - Login & Cart */}
//         <div className="flex items-center space-x-4">
//           <button className="bg-[#11295a] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
//             Login
//           </button>

//           {/* Cart Icon with Badge */}
//           <Link to="/cart" className="relative">
//             <ShoppingCart size={28} className="text-white hover:text-gray-300 transition" />
            
//             {/* Show cart count only if there are items */}
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <nav ref={menuRef} className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4 text-center font-semibold">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>About Us</Link>
//           <a href="http://agstamp.com/retailsales.htm" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Old Products</a>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
          
//           {/* Cart Link in Mobile Menu */}
//           <Link to="/cart" className="hover:text-black flex justify-center items-center gap-2" onClick={() => setIsOpen(false)}>
//             <ShoppingCart size={24} /> Cart
            
//             {/* Show cart count only if there are items */}
//             {cartCount > 0 && (
//               <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, ShoppingCart } from "lucide-react"; // Import cart icon
// import { useCart } from "../../Pages/CartContext";
// import { logo } from "../../assets/image";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../Redux/Reducer/userSlice";
// import { toast } from "react-toastify";

//  // Import useCart hook

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const menuRef = useRef<HTMLDivElement>(null);
//   const { cart } = useCart(); // Get cart data
//   const user = useSelector<RootState>(state=> state.userSlice.user) as User
//   const dispatch = useDispatch();
//   // Calculate total cart items
//   const cartCount = cart.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

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

//   //logout handler
//   const logoutHandler = async()=>{
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,{
//         withCredentials : true
//       })
//       dispatch(setUser(res.data?.user));
//       toast.success(res.data?.message);
//     } catch (error:any) {
//       toast.error(error.data?.error);
//     }
//   }

//   return (
//     <header className="bg-white text-blue-800 fixed top-0 left-0 w-full z-50">
//       <div className="px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
        
//         {/* <div className="flex flex-col items-center space-x-3 text-[#11295a]"> */}
//           <Link to="/" className="w-30 h-18 bg-white flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
//             <img src={logo} alt="Logo" className="w-full h-full object-contain" />
//           </Link>
//           {/* <Link to="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blueRibbon-950">
//             AG Stamp
//           </Link> */}
//         {/* </div> */}



//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
//           <a href="http://agstamp.com/retailsales.htm" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} target="_blank" onClick={() => setIsOpen(false)}>Old Products</a>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
//         </nav>

//         {/* Right Side - Login & Cart */}
//         <div className="flex items-center space-x-4">
//           {!user ? <Link to={"/login"} className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
//             Login
//           </Link> : <button onClick={logoutHandler} className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
//             Logout
//           </button>}

//           {/* Cart Icon with Badge */}
//           <Link to="/cart" className="relative">
//             <ShoppingCart size={28} className="text-blue-800 hover:text-gray-300 transition" />
            
//             {/* Show cart count only if there are items */}
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <nav ref={menuRef} className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4 text-center font-semibold">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>About Us</Link>
//           <a href="http://agstamp.com/retailsales.htm" className={`hover:text-black ${location.pathname === "/ebay-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Old Products</a>
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Contact Us</Link>
          
//           {/* Cart Link in Mobile Menu */}
//           <Link to="/cart" className="hover:text-black flex justify-center items-center gap-2" onClick={() => setIsOpen(false)}>
//             <ShoppingCart size={24} /> Cart
            
//             {/* Show cart count only if there are items */}
//             {cartCount > 0 && (
//               <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;import React, { useState, useEffect, useRef } from "react";


import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, UserCircle } from "lucide-react"; // Added UserCircle
import { useCart } from "../../Pages/CartContext";
import { logo } from "../../assets/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import axios from "axios";
import { setUser } from "../../Redux/Reducer/userSlice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const user = useSelector<RootState>((state) => state.userSlice.user) as User;
  const dispatch = useDispatch();

  const cartCount = cart.reduce((total: any, item: { quantity: any }) => total + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsProfileOpen(false);
      }
    };

    if (isOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isProfileOpen]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data?.user));
      toast.success(res.data?.message);
    } catch (error: any) {
      toast.error(error.data?.error);
    }
  };

  return (
    <header className="bg-white text-blue-800 fixed top-0 left-0 w-full z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="w-30 h-18 bg-white flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </Link>

        <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
          <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
          <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
          <a href="http://agstamp.com/retailsales.htm" target="_blank" className="hover:text-black">Old Products</a>
          <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
          <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <Link to={"/login"} className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-blue-800 hover:text-gray-600">
                <UserCircle size={28} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Dashboard</Link>
                  <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-blue-800 hover:text-gray-300 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav ref={menuRef} className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4 text-center font-semibold">
          <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>About Us</Link>
          <a href="http://agstamp.com/retailsales.htm" className="hover:text-black" onClick={() => setIsOpen(false)}>Old Products</a>
          <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`} onClick={() => setIsOpen(false)}>Contact Us</Link>

          <Link to="/cart" className="hover:text-black flex justify-center items-center gap-2" onClick={() => setIsOpen(false)}>
            <ShoppingCart size={24} /> Cart
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex justify-center items-center gap-2 text-white hover:text-gray-300"
              >
                <UserCircle size={24} /> Profile
              </button>
              {isProfileOpen && (
                <div className="mt-2 flex flex-col items-center space-y-2 bg-white rounded-lg shadow-lg py-2 text-blue-900">
                  <Link to="/dashboard" onClick={() => { setIsProfileOpen(false); setIsOpen(false); }} className="hover:bg-gray-100 w-full text-center px-4 py-2">Dashboard</Link>
                  <button onClick={() => { logoutHandler(); setIsProfileOpen(false); setIsOpen(false); }} className="hover:bg-gray-100 w-full text-center px-4 py-2">Logout</button>
                </div>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
