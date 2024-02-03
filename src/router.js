import { Navigate, createBrowserRouter, useParams } from "react-router-dom";
import Collections from "./pages/collections";
import Products from "./pages/product/products";
import ErrorPage from "./pages/errorPage";
import Home from "./pages/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AuthRequired from "./pages/auth/AuthRequired";
import Profile from "./pages/profiles/profile";
import Billings from "./pages/profiles/billings";
import Recovery from "./pages/auth/recovery";
import NewPassword from "./pages/auth/newPassword";
import ToNewPassword from "./pages/auth/toNewPassword";
import ProductDetail from "./pages/product/product_detail";
import Checkout from "./pages/product/checkout";

export const router = createBrowserRouter([
  {
    path: "/products/checkout/",
    element: <AuthRequired />,
    children: [{ index: true, element: <Checkout />, path: "" }],
  },
  { path: "/products/:product_name", element: <ProductDetail /> },
  { path: "/collections/:category", element: <Products /> },
  { path: "/collections", element: <Collections /> },

  { path: "/account/register", element: <Register /> },
  { path: "/accounts/login", element: <Login /> },
  { path: "/accounts/recovery", element: <Recovery/> },
  { path: "/accounts/recovery/:email/:time", element: <ToNewPassword /> },
  { path: "/accounts/recovery/reset-password", element: <NewPassword /> },

  {
    path: "/account/",
    element: <AuthRequired />,
    children: [
      {
        index: true,
        element: <Profile />,
        path: "",
      },
      {
        element: <Billings />,
        path: "billing-address",
      },
      {
        element: <Billings />,
        path: "orders",
      },
      {
        element: <Billings />,
        path: "orders/:order_id",
      },
    ],
  },

  { path: "/", element: <Home /> },
  { path: "*", element: <ErrorPage /> },
]);
