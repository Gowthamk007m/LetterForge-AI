import React from 'react'
import Navbar from './Navbar';
import Footer from "@/components/ui/Footer";
const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
