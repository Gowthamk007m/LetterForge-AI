import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <header className="px-4 lg:px-6 h-14 bg-gradient-to-b from-[#2b2530] to-gray-950 flex items-center border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
        <Link to="/" className="font-bold text-lg hover:text-white transition-colors cursor-pointer">LetterForge</Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            Features
          </button>
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            Tools
          </button>
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('pricing')}
          >
            Pricing
          </button>
          {/* <button className="text-sm font-medium hover:text-white transition-colors cursor-pointer">
            Contact
          </button> */}
        </nav>
      </header>

   
  )
}

export default Navbar
