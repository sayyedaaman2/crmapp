import React from 'react'
import Navbar from './Navbar'
const Layout = ({children}) => {
  return (
    <main>
        <Navbar />
        <body style={{
          height : 'calc(100vh - 3.5rem)'
        }} className='realtive' >
        {children}

        </body>
    </main>
  )
}

export default Layout
