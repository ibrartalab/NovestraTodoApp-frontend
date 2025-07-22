import React from 'react'

export const Header = () => {
  return (
    <header className='header flex justify-between items-center p-4 text-white'>
      <h1>Novestra Todo</h1>
      <nav className='navbar *:flex *:justify-between *items-center *:gap-4'>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </header>
  )
}
