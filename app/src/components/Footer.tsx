import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-2 text-center fixed bottom-0 w-full">
      &copy; {new Date().getFullYear()} Novestra
    </footer>
  )
}
