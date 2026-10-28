import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Network, Layers, GitFork, ArrowUpRight, Cpu } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { ArchitectureShowcase } from './ArchitectureShowcase';

export const ProjectsSection: React.FC = () => {
  const [showArchitecture, setShowArchitecture] = useState<boolean>(false);

  return (
 <section id="projects" className="w-full py-24 bg-transparent border-t border-slate-700/20 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-cyan mb-2 font-mono text-xs">
              <span className="tracking-widest">// ORBITAL SORTIES ARCHIVE 0x05</span>
              <span className="h-px w-12 bg-hud-cyan/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Mission Select: Target Sectors
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 mt-2">
              High-concurrency messaging fabrics, embedded database engines, and full-stack transactional networks.
            </p>
          </div>

          {/* Toggle between Projects & Systems Architecture View */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setShowArchitecture(false)}
              className={`px-4 py-2 rounded-full border transition cursor-pointer ${
                !showArchitecture
                  ? 'bg-hud-cyan text-slate-950 font-bold border-hud-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-surface-container text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              PROJECT MISSIONS
            </button>
            <button
              onClick={() => setShowArchitecture(true)}
              className={`px-4 py-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                showArchitecture
                  ? 'bg-hud-cyan text-slate-950 font-bold border-hud-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-surface-container text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE</span>
            </button>
          </div>
        </div>

        {/* Conditional View: Architecture Showcase vs Project Grid */}
        {showArchitecture ? (
          <ArchitectureShowcase />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_CONTENT.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-surface-container-low rounded-2xl overflow-hidden border border-slate-800/80 hover:border-hud-cyan/50 shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] transition-all flex flex-col group"
              >
                {/* Project Image Banner with Mission Tag */}
                <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent" />

                  {/* Mission Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[11px]">
                    <span className="px-3 py-1 rounded-full bg-space-950/85 backdrop-blur-md text-hud-cyan border border-hud-cyan/40 shadow-sm font-semibold">
                      {project.missionNumber} • {project.tag}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-space-950/85 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-hud-cyan hover:border-hud-cyan transition"
                      aria-label={`View ${project.title} Repository`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-hud-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-3 font-mono text-xs">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-surface-container text-slate-300 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 font-mono text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-hud-cyan transition-colors font-bold tracking-wider"
                    >
                      <Code className="w-4 h-4 text-hud-cyan" />
                      <span>ACCESS REPOSITORY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-slate-400">
                      {project.sector}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GitHub Activity Telemetry Console (Stitch Inspiration) */}
        <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-hud-cyan shadow-md shrink-0">
              <GitFork className="w-6 h-6 text-hud-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-white">Git Telemetry Radar</span>
                <span className="px-2.5 py-0.5 rounded-full bg-hud-cyan/10 text-hud-cyan border border-hud-cyan/30 text-[10px]">
                  NODE: {PORTFOLIO_CONTENT.gitTelemetry.node}
                </span>
              </div>
              <p className="font-sans text-xs text-slate-400 mt-0.5">
                Continuous integration commits, branch merges, and distributed architectural releases.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">ACTIVE_REPOS</span>
              <span className="font-display text-xl font-bold text-hud-cyan">
                {PORTFOLIO_CONTENT.gitTelemetry.activeRepos}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">STARS_LOGGED</span>
              <span className="font-display text-xl font-bold text-hud-teal">
                {PORTFOLIO_CONTENT.gitTelemetry.starsLogged}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">CODE_VELOCITY</span>
              <span className="font-display text-xl font-bold text-hud-amber">
                {PORTFOLIO_CONTENT.gitTelemetry.codeVelocity}
              </span>
            </div>

            <a
              href={PORTFOLIO_CONTENT.gitTelemetry.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-slate-800 text-white font-semibold transition border border-slate-700 flex items-center gap-1.5 shadow-sm"
            >
              <span>RADAR FEED</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-hud-cyan" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
