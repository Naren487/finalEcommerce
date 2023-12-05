import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<><NavBar /><Home /></>} />
          <Route path="/shop" element={<><NavBar /><Shop /></>} />
          <Route path="/shop/:id" element={<><NavBar /><Product /></>} />
          <Route path="/cart" element={<><NavBar /><Cart /></>} />
          <Route path="/login" element={<><NavBar /><Login /></>} />
          <Route path="/register" element={<><NavBar /><Register /></>} />
          <Route path="/success" element={<><NavBar /><Success /></>} />
          <Route path="/cancel" element={<><NavBar /><Cancel /></>} />

        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
