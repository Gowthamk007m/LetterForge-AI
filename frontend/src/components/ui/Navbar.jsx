import React from 'react'

const Navbar = () => {
  return (
      <header className="px-4 lg:px-6 h-14 bg-gray-950 flex items-center border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
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
          <button className="text-sm font-medium hover:text-white transition-colors cursor-pointer">
            Contact
          </button>
        </nav>
      </header>

   
  )
}

export default Navbar
