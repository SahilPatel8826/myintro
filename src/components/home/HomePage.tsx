
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { OrbitScene } from './OrbitScene';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

interface HomePageProps {
  onReplayIntro: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onReplayIntro,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative isolate min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-hud-cyan selection:text-black"
    >
      {/* Persistent animated background */}
      <OrbitScene />

      {/* Foreground content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar onReplayIntro={onReplayIntro} />

        <main className="flex-1 w-full flex flex-col">
          <Hero onReplayIntro={onReplayIntro} />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer onReplayIntro={onReplayIntro} />
      </div>
    </motion.div>
  );
};
