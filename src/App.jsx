import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {useState, useEffect} from "react";

import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { OrdersPage } from "./OdersPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mini-capstone-api-v7ht.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const admin = localStorage.getItem("admin") === "true";
    
    console.log("email from storage", email);
    console.log("admin from storage", admin);

    setIsLoggedIn(!!email);
    setIsAdmin(admin);

    if (email) {
      handleCartIndex
    }
  }, []);
  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      handleCartIndex();
    }
  }, [isLoggedIn]);



  const handleCartIndex = () => {
    console.log("handleCartIndex");
    axios.get("/carted_products.json").then((response) => {
      console.log("Cart items:", response.data);
      setCartItems(response.data);
    }).catch((error) => {
      console.error("Error fetching cart:", error);
    });
  }

  const handleAddToCart = (product) => {
    console.log("handleAddToCart", product);
    axios.post("/carted_products.json", {
      product_id: product.id,
      quantity: 1
    }).then((response) => {
      console.log("Added to cart:", response.data);
      handleCartIndex(); 
    }).catch((error) => {
      console.error("Error adding to cart:", error);
    });
  }

  const handleRemoveFromCart = (cartedProduct) => {
    console.log("handleRemoveFromCart", cartedProduct);
    axios.delete(`/carted_products/${cartedProduct.id}.json`).then((response) => {
      console.log("Remove from cart:", response.data);
      handleCartIndex();
    }).catch((error) => {
      console.error("Error removing from cart:", error);
    });
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ 
        setIsLoggedIn,
        setIsAdmin,
        cartItems, 
        onAddToCart: handleAddToCart, 
        onRemoveFromCart: handleRemoveFromCart,
        onRefreshCart: handleCartIndex,
        isAdmin
         }} />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/orders",
        element: <OrdersPage />
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;