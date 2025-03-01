import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Heder";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";

const App = () => {
  return (
      <BrowserRouter>
        <div className="flex flex-col min-h-screen whitespace-normal break-words">
        <Header />
        <div className="h-20"/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
