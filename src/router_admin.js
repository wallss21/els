import { createBrowserRouter } from "react-router-dom";
import All from "./pages/admin_pages/all";
import ErrorPage from "./pages/errorPage";
import BaseTemplate from "./pages/admin_pages/base_template";
import Users from "./pages/admin_pages/users";
import Products from "./pages/admin_pages/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseTemplate />,
    children: [
      { index: true, element: <Users />, path: "" },
      { index: true, element: <Users />, path: "/users" },
      { index: true, element: <Products />, path: "/products" },
      { index: true, element: <Users />, path: "/orders" },
    ],
  },

  { path: "*", element: <ErrorPage /> },
]);
