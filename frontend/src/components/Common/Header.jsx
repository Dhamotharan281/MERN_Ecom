import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
    <header className="border-b-[3px] border-gray-300 rounded-md shadow-sm"
>
<TopBar/>
<Navbar/>
    </header>

    </>
  )
}

export default Header
