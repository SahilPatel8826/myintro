import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

interface HomePageProps {
  onReplayIntro: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onReplayIntro }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      className="min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-hud-cyan selection:text-black"
    >
      <Navbar onReplayIntro={onReplayIntro} />
      <main className="flex-1 w-full flex flex-col">
        {/* 
          Enforced Section Order:
          1. Hero
          2. About
          3. Skills
          4. Experience
          5. Projects
          6. Contact
        */}
        <Hero onReplayIntro={onReplayIntro} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer onReplayIntro={onReplayIntro} />
    </motion.div>
  );
};
