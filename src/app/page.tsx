'use client';
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection'
import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader/Preloader';
import Projects from '@/components/Projects/Projects';
import Description from '@/components/Description/Description';
import SlidingImages from '@/components/SlidingImages/SlidingImages';
import Landing from '@/components/Landing/Landing';
import SkillSphereCanvas from '@/common/SkillSphere';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


const DEBOUNCE_TIME = 100;

export const isSmallScreen = (): boolean => document.body.clientWidth < 767;
export const NO_MOTION_PREFERENCE_QUERY =
  "(prefers-reduced-motion: no-preference)";

export interface IDesktop {
  isDesktop: boolean;
}
const Home: FC = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const [isDesktop, setisDesktop] = useState(true);

  let timer: NodeJS.Timeout = null;

  const debouncedDimensionCalculator = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const isDesktopResult =
        typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1;

      window.history.scrollRestoration = "manual";

      setisDesktop(isDesktopResult);
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    debouncedDimensionCalculator();

    window.addEventListener("resize", debouncedDimensionCalculator);
    return () =>
      window.removeEventListener("resize", debouncedDimensionCalculator);
  }, [timer]);
  
  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing/>
      <div className="min-h-screen bg-white flex items-center justify-center">
      <SkillSphereCanvas/>
    </div>
      <Description />
      <Projects />
      <ProjectsSection isDesktop={isDesktop}/>
      <SlidingImages />
    </main>
  )
}

export default Home