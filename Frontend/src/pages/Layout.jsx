import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <div
      className="flex flex-col h-screen bg-gray-100  "
      // style={{
      //   backgroundImage: 'url("/homephone.jpg")',
      // }}
    >
      <Header />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
