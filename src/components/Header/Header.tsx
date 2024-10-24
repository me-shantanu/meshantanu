import React, { FC } from 'react'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className='bg-sidebar h-12'>
      <ThemeToggle />
    </header>
  )
}

export default Header
