'use client';
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import HeaderMobile from './HeaderMobile';
import { NAV_ITEMS } from '@/utils/constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-10 px-5 transition-all duration-500 ${
        isScrolled ? 'bg-sidebar' : 'bg-transparent'
      }  flex items-center justify-between h-14`}
    >
      <h4 className="text-textPrimary font-semibold ">Shantanu</h4>
      <nav className="hidden md:flex gap-4 items-center">
        <ul className="flex gap-4">
          {NAV_ITEMS.map((text, index) => (
            <li key={index} className="link">
              <Link
                href={text.href}
                className="hover:text-link text-textPrimary"
              >
                {text.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-4 items-center">
        <HeaderMobile />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
