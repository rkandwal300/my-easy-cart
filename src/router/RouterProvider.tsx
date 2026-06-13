import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
 
import MainLayout from "@/layouts/MainLayout"; 

const ProductListPage = lazy(() => import("@/files/PdList/ProductListPage"));
const ProductDetail = lazy(() => import("@/files/PdDetail/ProductDetail"));
const Error = lazy(() => import("@/files/Error"));
const CartP = lazy(() => import("@/files/Cart/CartP"));
const SignUp = lazy(() => import("@/files/SignUp/Sign_Up"));
const LogIn2 = lazy(() => import("@/files/SignUp/LogIn2"));
const Contact = lazy(() => import("@/components/shared/Contact"));
const About = lazy(() => import("@/components/shared/About"));
  
import AuthRoute from "@/files/SignUp/AuthRoute";
import Authentication from "@/files/SignUp/Authentication";
 
const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { index: true, element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "products/Cart", element: <CartP /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "LogIn",
        element: (
          <AuthRoute children2={<SignUp />}>
            <Authentication>
              <LogIn2 />
            </Authentication>
          </AuthRoute>
        ),
      },
      { path: ":abc", element: <Error /> },
      { path: "*", element: <Error /> },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);
