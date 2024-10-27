'use client';
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection'
import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Projects from '@/components/Projects';
import Description from '@/components/Description';
import SlidingImages from '@/components/SlidingImages';
import Contact from '@/components/Contact';
import Landing from '@/components/Landing/Landing';

const Home: FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing/>
      <Description />
      <Projects />
      <ProjectsSection isDesktop={true}/>
      <SlidingImages />
      <Contact />
    </main>
  )
}

export default Home