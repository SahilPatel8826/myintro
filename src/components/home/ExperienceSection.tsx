
import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-24 bg-transparent border-t border-slate-700/20"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-cyan mb-2 font-mono text-xs">
              <span className="tracking-widest">
                // FLIGHT RECORD 0x04
              </span>
              <span className="h-px w-12 bg-hud-cyan/40" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              Expedition Flight Log
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-300 drop-shadow-md">
            CHRONO_SORT: DESCENDING // VERIFIED MISSIONS
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto w-full pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-hud-cyan via-hud-teal to-transparent" />

          <div className="flex flex-col gap-10">
            {PORTFOLIO_CONTENT.experience.map((item, index) => (
              <motion.div
                key={item.role + item.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-6 sm:pl-10"
              >
                {/* Timeline Checkpoint */}
                <div className="absolute -left-[1.35rem] sm:-left-[1.85rem] top-1.5 w-4 h-4 rounded-full bg-slate-950/80 border-2 border-hud-cyan flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-hud-cyan animate-ping" />
                </div>

                {/* Transparent Experience Card */}
                <div className="bg-slate-950/15 backdrop-blur-[2px] p-6 sm:p-8 rounded-2xl border border-slate-400/20 hover:border-hud-cyan/50 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col gap-4 group">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-hud-cyan transition-colors drop-shadow-md">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-3 py-1 rounded-full bg-hud-cyan/10 text-hud-cyan border border-hud-cyan/30">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-hud-teal font-mono text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="font-semibold text-white drop-shadow-md">
                      {item.company}
                    </span>
                    <span className="text-slate-400">///</span>
                    <span className="text-slate-200 drop-shadow-sm">
                      {item.mission}
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-slate-100 leading-relaxed drop-shadow-md">
                    {item.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-400/20 font-mono text-xs">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/20 text-slate-200 border border-slate-400/20 hover:border-hud-cyan/40 hover:bg-slate-800/30 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
