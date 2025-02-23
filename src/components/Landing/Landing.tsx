'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';

const Landing = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-500px',
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className="relative flex h-screen overflow-hidden bg-cover"
    >
      <Image
        src="/images/background.jpg"
        fill={true}
        alt="background"
        className="object-cover"
      />
      <div className="overlay"></div>
      <div className="absolute lg:top-[calc(100vh-350px)] sm:top-[calc(100vh-180px)] md:top-[calc(100vh-230px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="inline-block text-textPrimary lg:text-[230px] sm:text-[100px] md:text-[150px] font-medium pr-12"
          >
            Software Developer -
          </p>
          <p
            ref={secondText}
            className="absolute top-0 left-full text-textPrimary lg:text-[230px] sm:text-[100px] md:text-[150px] font-medium pr-12"
          >
            Software Developer -
          </p>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed={0.1}
        className="absolute top-[35%] left-[65%] text-textPrimary text-2xl font-light"
      >
        <h3 className="m-0 mb-2">Shantanu Mishra</h3>
        <h4 className="m-0">Designer & Developer</h4>
      </div>
    </motion.main>
  );
};
export default Landing;
