import React from 'react';
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Layout = ({ children, noHeaderFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      {!noHeaderFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
