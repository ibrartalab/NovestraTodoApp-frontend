import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white p-2 text-center fixed bottom-0 w-full">
      &copy; {new Date().getFullYear()} Novestra Todo
    </footer>
  )
}
