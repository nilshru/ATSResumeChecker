import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function Layout() {
  return (
    <div
      className="flex flex-col h-screen backdrop:blur-sm bg-cover bg-center"
      style={{
        backgroundImage: 'url("/homePC.png")',
      }}
    >
      <Header />
      <main className="flex-grow overflow-y-auto hide-scrollbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
