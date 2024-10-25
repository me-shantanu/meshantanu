'use client'
import React, { FC, useState, useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-10 px-5 transition-all ${
        isScrolled ? 'bg-sidebar' : 'bg-background'
      }  flex items-center justify-between h-14`}
    >
      <h4 className='text-textPrimary font-semibold'>Shantanu</h4>
      <nav className='hidden md:flex gap-4 items-center'>
        <ul className='flex gap-4'>
          {['Home', 'About', 'Work', 'Contact'].map((text) => (
            <li key={text} className='link'>
              <Link href={`/${text.toLowerCase()}`} className='hover:text-link text-textPrimary'>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-overlay backdrop-blur-md mobile-menu z-40 flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-8 text-2xl text-textPrimary">
            {['Home', 'About', 'Work', 'Contact'].map((text) => (
              <li key={text} className="nav-item link">
                <Link href={`/${text.toLowerCase()}`} className="hover:text-link" onClick={() => setIsMenuOpen(false)}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='flex gap-4 items-center'>
      <div className='md:hidden z-40'>
        <button
          className='hamburger-icon relative w-8 h-8 flex flex-col gap-2 justify-center items-center'
          onClick={()=> setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className={`h-0.5 w-full bg-textPrimary transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`h-0.5 w-full bg-textPrimary transition-all duration-300 ${
              isMenuOpen ? 'hidden' : 'block'
            }`}
          />
          <span
            className={`h-0.5 w-full bg-textPrimary transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>
      </div>
      <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
