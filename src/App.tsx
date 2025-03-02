import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Heder";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";

const App = () => {
  return (
      <BrowserRouter>
        <div className="flex flex-col min-h-screen whitespace-normal break-words">
        <Header />
        <div className="h-20"/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
