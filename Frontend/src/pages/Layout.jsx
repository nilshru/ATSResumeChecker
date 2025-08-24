import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";
import MainLoder from "../components/Loader/MainLoder";

function Layout() {
  const {loading} = useAuth();
  if(loading){
    return(
   
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">

      <MainLoder/>
      </div>
     
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow pt-16 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
 