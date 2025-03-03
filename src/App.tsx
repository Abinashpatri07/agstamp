import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Heder";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import RetailSales from "./Pages/RetailSales";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import { CartProvider } from "./Pages/CartContext";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen whitespace-normal break-words">
        <Header />
        <div className="h-20"/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/retail-sales" element={<RetailSales/>}/>
         
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>  
  );
};

export default App;
