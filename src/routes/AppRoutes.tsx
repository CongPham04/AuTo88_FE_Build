import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";

import HomePage from "@/pages/Home/HomePage";
import CarListPage from "@/pages/Cars/CarListPage";
import CarDetailsPage from "@/pages/Cars/CarDetailsPage";
import CartPage from "@/pages/Cart/CartPage";
import CheckoutPage from "@/pages/Cart/CheckoutPage";
import UserProfile from "@/pages/User/UserProfile";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import NewsPage from "@/pages/News/NewsPage";
import ComparisonPage from "@/pages/Comparison/ComparisonPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarListPage /> },
      { path: "cars/:id", element: <CarDetailsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "profile", element: <UserProfile /> },
      { path: "news", element: <NewsPage /> },
      { path: "comparison", element: <ComparisonPage /> }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> }
    ],
  }
]);
