import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
 
import MainLayout from "@/layouts/MainLayout"; 

const ProductListPage = lazy(() => import("@/files/PdList/ProductListPage"));
const ProductDetail = lazy(() => import("@/files/PdDetail/ProductDetail"));
const Error = lazy(() => import("@/files/Error"));
const CartP = lazy(() => import("@/files/Cart/CartP"));
const SignUp = lazy(() => import("@/files/SignUp/Sign_Up"));
const LogIn = lazy(() => import("@/components/shared/auth"));
const Contact = lazy(() => import("@/components/shared/Contact"));
const About = lazy(() => import("@/components/shared/About"));
  
import AuthRoute from "@/files/SignUp/AuthRoute"; 
import { HEADER_LIST } from "@/lib/routes.enum";
 
const routeConfig: RouteObject[] = [
  {
    path: HEADER_LIST.home,
    element: <MainLayout />, 
    children: [
      { index: true, element: <ProductListPage /> },
      { path: HEADER_LIST.productDetail, element: <ProductDetail /> },
      { path: HEADER_LIST.contact, element: <Contact /> },
      { path: HEADER_LIST.about, element: <About /> },
      { path: HEADER_LIST.cart, element: <CartP /> },
    {
        path: HEADER_LIST.auth,
        element: (
          <AuthRoute children2={<SignUp />}>
              <LogIn />  
          </AuthRoute>
        ),
      },
      { path: ":abc", element: <Error /> },
      { path: "*", element: <Error /> },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);
