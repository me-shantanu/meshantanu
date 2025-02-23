import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink/NavLink';
import Curve from './Curve/Curve';
import Footer from './Footer/Footer';
import { menuSlide } from '../animation';
import { NAV_ITEMS } from '@/utils/constants';

export default function NavMobile() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 right-0 h-screen bg-[#292929] text-white z-30"
    >
      <div className="box-border h-full p-24 flex flex-col justify-between">
        <div
          onMouseLeave={() => setSelectedIndicator(pathname)}
          className="flex flex-col mt-20 text-[56px] gap-3"
        >
          <div className="uppercase text-[11px] text-[#999] border-b border-[#999] mb-10">
            <p>Navigation</p>
          </div>
          {NAV_ITEMS.map((data: { title: string; href: string }, index) => (
            <NavLink
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator == data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}
