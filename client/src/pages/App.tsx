import Layout from "../components/Layout";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import Home from "./Home";
import CreateProduct from "./createProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import About from "./About";
import { Toaster } from "react-hot-toast";
import Product from "./product";
import Dashboard from "./dashboard";
import { useAuthInit } from "../hooks/useAuthInit";
import AdminView from "./AdminView";
import Products from "./products";

function App() {
  useAuthInit();
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/create-product"
              element={<CreateProduct onClose={() => {}} isModal={false} />}
            />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-stuff" element={<AdminView />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            background: "#264143",
            color: "#fff",
            border: "2px solid #e99f4c",
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            boxShadow: "3px 3px 0px #de5499",
          },
          success: {
            iconTheme: {
              primary: "#00C851",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
