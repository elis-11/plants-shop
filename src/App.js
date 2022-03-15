import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./AppContext";
import MainNavbar from "./layout/MainNavbar";
import PageRegister from "./pages/PageRegister";
import PageLogin from "./pages/PageLogin";
import PageLogout from "./pages/PageLogout";
import PageAdmin from "./pages/PageAdmin";
import Home from "./components/Home";
import Plants from "./components/Plants";
import Contact from "./components/Contact";
import Checkout from "./components/checkout/Checkout";
import Cart from "./components/Cart";
import MyAccount from "./components/MyAccount";
import { Garden, Indoor, Trending } from "./components/Location";
import Customers from "./Dashboard/Customers";
import AddProduct from './components/AddProduct'

// import Footer from "./layout/Footer";
import PaymentForm from "./components/checkout/PaymentForm";
import Successful from "./pages/Successful";
import ThankYou from "./pages/ThankYou";


const App = () => {
  const { currentUserIsInGroup } = useContext(AppContext);
  return (
    <Router>
      <div className="App">
        <MainNavbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Trending></Trending>}></Route>
              <Route path="/garden" element={<Garden></Garden>}></Route>
              <Route path="/indoor" element={<Indoor></Indoor>}></Route>
            </Route>
            <Route path="/plants" element={<Plants />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myaccount/*" element={<MyAccount />}>
              <Route path="dashboard" element={ <p>under construction 👷 </p>}></Route>
              <Route path="customers" element={<Customers />}></Route>
              <Route path="customers" element={<Customers />}></Route>
              <Route path="addproduct" element={<AddProduct />}></Route>
            </Route>

            <Route path="/contact" element={<Contact />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route path="/successful" element={<Successful />} />
            <Route path="/thankyou" element={<ThankYou />} />

            {currentUserIsInGroup("loggedOutUsers") && (
              <Route path="/register" element={<PageRegister />} />
            )}

            {currentUserIsInGroup("loggedOutUsers") && (
              <Route path="/login" element={<PageLogin />} />
            )}

            {currentUserIsInGroup("admins") && (
              <Route path="/admin" element={<PageAdmin />} />
            )}

            {currentUserIsInGroup("loggedInUsers") && (
              <Route path="/logout" element={<PageLogout />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
