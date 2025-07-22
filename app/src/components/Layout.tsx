import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = ({children}: {children:React.ReactNode}) => {
  return (
   <div className="layout w-full h-dvh bg-gradient-to-b">
    <Header />
    <main
    className='flex-1 flex flex-col items-center justify-center p-4'
    >{children}</main>
    <Footer/>
   </div>
  )
}
