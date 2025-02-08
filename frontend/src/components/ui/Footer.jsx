import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-black">
    <p className="text-xs text-gray-400">© 2025 LetterForge AI. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      {/* Additional footer links can be added here */}
    </nav>
  </footer>
  )
}

export default Footer
