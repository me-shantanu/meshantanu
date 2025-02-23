/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MENULINKS, PROJECTS } from '@/utils/constants';
import { gsap, Linear } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { IDesktop, NO_MOTION_PREFERENCE_QUERY } from '@/utils/utils';
import ProjectTile from './ProjectTile';

// Register the ScrollTrigger plugin with GSAP
// gsap.registerPlugin(ScrollTrigger);

const PROJECT_STYLES = {
  SECTION:
    'w-full relative select-none section-container flex-col flex py-8 justify-center',
  PROJECTS_WRAPPER:
    'tall:mt-12 mt-6 grid grid-flow-col auto-cols-max md:gap-10 gap-6 project-wrapper w-fit seq snap-x scroll-pl-6 snap-mandatory',
};

const ProjectsSection = ({ isDesktop }: IDesktop) => {
  const targetSectionRef = useRef<HTMLDivElement | null>(null);
  const sectionTitleElementRef = useRef<HTMLDivElement | null>(null);

  const [willChange, setWillChange] = useState(false);
  const [horizontalAnimationEnabled, setHorizontalAnimationEnabled] =
    useState(false);

  const initRevealAnimation = (
    targetSectionRef: MutableRefObject<HTMLDivElement | null>
  ): [GSAPTimeline, ScrollTrigger] | null => {
    if (!targetSectionRef.current) return null;
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSectionRef.current.querySelectorAll('.seq'),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      '<'
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSectionRef.current,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 0,
      animation: revealTl,
    });

    return [revealTl, scrollTrigger];
  };

  const initProjectsAnimation = (
    targetSectionRef: MutableRefObject<HTMLDivElement | null>,
    sectionTitleElementRef: MutableRefObject<HTMLDivElement | null>
  ): [GSAPTimeline, ScrollTrigger] | null => {
    if (!targetSectionRef.current || !sectionTitleElementRef.current)
      return null;

    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    const projectWrapper = targetSectionRef.current.querySelector(
      '.project-wrapper'
    ) as HTMLDivElement;
    if (!projectWrapper) return null;

    const containerWidth = projectWrapper.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = containerWidth - viewportWidth; // Total scroll distance needed

    timeline.to(projectWrapper, { x: -scrollDistance });

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSectionRef.current,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      animation: timeline,
      pinSpacing: 'margin',
      onToggle: (self) => setWillChange(self.isActive),
    });

    return [timeline, scrollTrigger];
  };

  useEffect(() => {
    let projectsScrollTrigger: ScrollTrigger | undefined;
    let projectsTimeline: GSAPTimeline | undefined;

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    setHorizontalAnimationEnabled(isDesktop && matches);

    if (isDesktop && matches) {
      const result = initProjectsAnimation(
        targetSectionRef,
        sectionTitleElementRef
      );
      if (result) {
        [projectsTimeline, projectsScrollTrigger] = result;
      }
    } else {
      const projectWrapper = targetSectionRef.current?.querySelector(
        '.project-wrapper'
      ) as HTMLDivElement;
      if (targetSectionRef.current && projectWrapper) {
        const parentPadding = window
          .getComputedStyle(targetSectionRef.current)
          .getPropertyValue('padding-left');

        targetSectionRef.current.style.setProperty('width', '100%');
        projectWrapper.classList.add('overflow-x-auto');
        projectWrapper.style.setProperty('width', `calc(100vw)`);
        projectWrapper.style.setProperty('padding', `0 ${parentPadding}`);
        projectWrapper.style.setProperty(
          'transform',
          `translateX(-${parentPadding})`
        );
      }
    }

    const revealResult = initRevealAnimation(targetSectionRef);
    let revealTimeline: GSAPTimeline | undefined;
    let revealScrollTrigger: ScrollTrigger | undefined;
    if (revealResult) {
      [revealTimeline, revealScrollTrigger] = revealResult;
    }

    return () => {
      projectsScrollTrigger && projectsScrollTrigger.kill();
      projectsTimeline && projectsTimeline.kill();
      revealScrollTrigger && revealScrollTrigger.kill();
      revealTimeline && revealTimeline.progress(1);
    };
  }, [targetSectionRef, sectionTitleElementRef, isDesktop]);

  const renderSectionTitle = (): React.ReactNode => (
    <div
      className={`flex flex-col inner-container ${willChange ? 'will-change-transform' : ''}`}
      ref={sectionTitleElementRef}
    >
      <p className="section-title-sm seq">PROJECTS</p>
      <h1 className="section-heading seq mt-2">My Works</h1>
      <h2 className="text-2xl md:max-w-3xl w-full seq max-w-sm mt-2">
        I have contributed in over 20+ projects ranging from Frontend
        development, UI/UX design, Open Source, and Motion Graphics
      </h2>
    </div>
  );

  const renderProjectTiles = (): React.ReactNode =>
    PROJECTS.map((project) => (
      <ProjectTile
        project={project}
        key={project.name}
        animationEnabled={horizontalAnimationEnabled}
      />
    ));

  const { ref: projectsSectionRef } = MENULINKS[1];

  return (
    <section
      ref={targetSectionRef}
      className={`${isDesktop && 'min-h-screen'} ${PROJECT_STYLES.SECTION}`}
      id={projectsSectionRef}
    >
      {renderSectionTitle()}
      <div className={PROJECT_STYLES.PROJECTS_WRAPPER}>
        {renderProjectTiles()}
      </div>
    </section>
  );
};

export default ProjectsSection;
