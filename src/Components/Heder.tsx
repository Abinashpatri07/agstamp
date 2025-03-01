import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md mt-16">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">My Store</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/ebay-sale" className="hover:text-gray-200">Ebay Sale</Link>
          <Link to="/retail-sales" className="hover:text-gray-200">Retail Sales</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4">
          <Link to="/" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/ebay-sale" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Ebay Sale</Link>
          <Link to="/retail-sales" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Retail Sales</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
