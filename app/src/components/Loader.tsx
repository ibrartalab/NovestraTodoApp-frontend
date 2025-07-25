import React from 'react'

export const Loader = () => {
  return (
    <div className='loader-wrapper flex items-center justify-center  w-full h-full absolute top-0 bg-gray-400/30 z-50'>
        <div className="loader w-20 h-20 border-8 border-t-8 border-l-transparent border-r-transparent border-indigo-500 rounded-full animate-spin">
        </div>
    </div>
  )
}
