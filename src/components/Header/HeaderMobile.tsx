'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import NavMobile from './nav/NavMobile';

export default function HeaderMobile() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div className="md:hidden flex z-40">
        <button
          className="hamburger-icon relative w-8 h-8 flex flex-col gap-2 justify-center items-center"
          onClick={() => {
            setIsActive(!isActive);
          }}
          aria-label="Toggle navigation"
        >
          <span
            className={`h-0.5 w-full bg-textPrimary transition-transform duration-300 ${
              isActive ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`h-0.5 w-full bg-textPrimary transition-all duration-300 ${
              isActive ? 'hidden' : 'block'
            }`}
          />
          <span
            className={`h-0.5 w-full bg-textPrimary transition-transform duration-300 ${
              isActive ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>
      </div>
      <AnimatePresence mode="wait">{isActive && <NavMobile />}</AnimatePresence>
    </>
  );
}
