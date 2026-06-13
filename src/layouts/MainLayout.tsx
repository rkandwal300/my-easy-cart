import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../files/Header";
import Footer from "../files/footer";
import ProductState from "@/Api/Sort-Search";
import UserState from "@/Api/UserContext";
import CartState from '@/Api/CartContext';
import AlertState from "@/Api/AlertContext";

const MainLayout: React.FC = () => {
  return (

    <AlertState>
      <UserState>
        <CartState>
          <ProductState>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          </ProductState>
        </CartState>
      </UserState>
    </AlertState>
  );
};

export default MainLayout;