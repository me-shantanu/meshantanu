'use client';
import styles from './style.module.scss';
import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Project from './components/project/Project';
import RoundedButton from '../common-ui/RoundedButton/RoundedButton';

interface ProjectType {
  title: string;
  src: string;
  color: string;
}

interface ModalState {
  active: boolean;
  index: number;
}

interface QuickToRefs {
  (value: number): void;
}

const projects: ProjectType[] = [
  { title: 'C2 Montreal', src: 'c2montreal.png', color: '#000000' },
  { title: 'Office Studio', src: 'officestudio.png', color: '#8C8C8C' },
  { title: 'Locomotive', src: 'locomotive.png', color: '#EFE8D3' },
  { title: 'Silencio', src: 'silencio.png', color: '#706D63' },
];

const scaleAnimation: Variants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Projects() {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  const xMoveContainer = useRef<QuickToRefs | null>(null);
  const yMoveContainer = useRef<QuickToRefs | null>(null);
  const xMoveCursor = useRef<QuickToRefs | null>(null);
  const yMoveCursor = useRef<QuickToRefs | null>(null);
  const xMoveCursorLabel = useRef<QuickToRefs | null>(null);
  const yMoveCursorLabel = useRef<QuickToRefs | null>(null);

  useEffect(() => {
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
        duration: 0.8,
        ease: 'power3',
      });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
        duration: 0.8,
        ease: 'power3',
      });

      xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
        duration: 0.5,
        ease: 'power3',
      });
      yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
        duration: 0.5,
        ease: 'power3',
      });

      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      });
    }
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
      className={styles.projects}
    >
      <div className={styles.body}>
        {projects.map((project, index) => (
          <Project
            index={index}
            title={project.title}
            manageModal={manageModal}
            key={index}
          />
        ))}
      </div>
      <RoundedButton>
        <p>More work</p>
      </RoundedButton>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={modal.active ? 'enter' : 'closed'}
          className={styles.modalContainer}
        >
          <div
            style={{ top: `${modal.index * -100}%` }}
            className={styles.modalSlider}
          >
            {projects.map((project, i) => (
              <div
                className={styles.modal}
                style={{ backgroundColor: project.color }}
                key={`modal_${i}`}
              >
                <Image
                  src={`/images/${project.src}`}
                  width={300}
                  height={0}
                  alt="image"
                />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={modal.active ? 'enter' : 'closed'}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={modal.active ? 'enter' : 'closed'}
        >
          View
        </motion.div>
      </>
    </main>
  );
}
