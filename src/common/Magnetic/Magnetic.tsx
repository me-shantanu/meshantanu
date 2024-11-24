import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Define the type for Magnetic props
interface MagneticProps {
  children: React.ReactElement; // A single React element as a child
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const currentElement = magnetic.current;
    currentElement.addEventListener("mousemove", handleMouseMove);
    currentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentElement.removeEventListener("mousemove", handleMouseMove);
      currentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};

export default Magnetic;
