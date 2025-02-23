import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { scale, slide } from '../../animation';

interface NavLinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: Dispatch<SetStateAction<string>>;
}

const NavLink: React.FC<NavLinkProps> = ({
  data,
  isActive,
  setSelectedIndicator,
}) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className="w-2.5 h-2.5 bg-white rounded-full absolute left-[-30px]"
      />
      <Link href={href} className="text-white">
        {title}
      </Link>
    </motion.div>
  );
};

export default NavLink;
