import React, { FC } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className='bg-sidebar h-12 flex items-center justify-between'>
      <nav>
        <ul className='flex gap-2'>
          <li className='link'><Link href={'/'} className='hover:text-link text-textPrimary'>Home</Link></li>
          <li><Link href={'/'} className='text-link hover:text-textPrimary'>About</Link></li>
          <li><Link href={'/'} className='hover:text-link text-textPrimary'>Work</Link></li>
          <li><Link href={'/'} className='text-link hover:text-textPrimary'>Contact</Link></li>
        </ul>
      </nav> 
      <ThemeToggle />
    </header>
  )
}

export default Header
