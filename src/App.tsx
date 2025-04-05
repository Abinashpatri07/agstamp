import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Heder";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import RetailSales from "./Pages/RetailSales";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import { CartProvider } from "./Pages/CartContext";
import ContactUs from "./Pages/ContactUs";
import { useEffect } from "react";
import PaymentMethod from "./Pages/PaymentMethod";
import CheckoutPage from "./Pages/CheckoutPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { useUserInfoQuery } from "./Redux/Api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/Reducer/userSlice";
import AddStamp from "./Pages/AddStamp";




const App = () => {
  const dispatch = useDispatch();
  const { data } = useUserInfoQuery();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));  // Dispatch only when data is available
    }
  }, [data, dispatch]);
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen whitespace-normal break-words">
        <Header />
        <div className="h-24.5"/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>}/> 
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/retail-sales" element={<RetailSales/>}/>
         
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/paymentmethod" element={<PaymentMethod/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />

          {/* admin routes  */}
          <Route path="/admin/addstamp" element={<AddStamp/>} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </CartProvider> 
  );
};

export default App;
